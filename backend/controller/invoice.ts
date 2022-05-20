import { response } from "express";
import { date } from "joi";
import { ResponseHandler } from "../utils";
const joi = require("joi");
const models = require("../models");
import { BtcExchangeValue, PriceConverter } from "../utils";
import { deriveBitcoinAddress } from "../utils/bitcoinAddressDeriavation";
import { GenerateInvoice, LookupInvoice } from "../utils/lightning";
import { BitcoinAddressChecker } from "../utils/electrs_provider";

/**
 * Invoice Schema
 * id (required)
 * uuid (required)
 * amount (usd required)
 * order id (optiona)
 * description  (optional)
 * customer_email (optional)
 * bitcoin address (required)
 * lightning invoice (required)
 * exchange_rate
 * satoshi_paid
 * lightning_invoice_hasg(required)
 */

export const CreateInvoice = async (body: any) => {
  const schema = joi.object({
    email: joi.string().email(),
    amount: joi.number().required(),
    description: joi.string(),
    orderId: joi.string(),
  });

  const validation = schema.validate({
    email: body.email,
    amount: body.amount,
    description: body.description,
    orderId: body.orderId,
  });

  if (validation.error) {
    return ResponseHandler(422, validation.error.details[0].message);
  }
  const store = await models.Store.findOne({
    where: { userId: body.user.id },
    include: models.Wallet,
  });
  // Temporary Lightning configurations
  const server: any = process.env.LND_SERVER;
  const cert: any = process.env.CERT;
  const macaroon: any = process.env.MACAROON_HEX;
  if (store) {
    if (store.Wallet) {
      const exchangeValue = await BtcExchangeValue();
      const bitcoin = PriceConverter(exchangeValue, body.amount);
      if (store.Wallet.xpub && store.Wallet.macaroon) {
        const btcAddress = deriveBitcoinAddress(
          store.Wallet.xpub,
          store.Wallet.derivationPath,
          store.Wallet.currentIndex
        );
        const lightning = await GenerateInvoice(
          server,
          cert,
          macaroon,
          bitcoin.sats,
          body.description
        );
        const t = await models.sequelize.transaction();
        try {
          const invoice = await models.Invoice.create(
            {
              amount: body.amount,
              order_id: body.orderId,
              description: body.description,
              status: "pending",
              btc_address: btcAddress,
              lightning_invoice: lightning?.paymentRequest,
              exchange_rate: exchangeValue,
              satoshi_paid: 0,
              storeUuid: store.uuid,
              lightning_invoice_hash: (lightning?.rHash as Buffer).toString(
                "base64"
              ),
              customer_email: body.email,
            },
            { transaction: t }
          );
          const updateWallet = await models.Wallet.update(
            { currentIndex: store.Wallet.currentIndex + 1 },
            { where: { storeUuid: store.uuid } },
            { transaction: t }
          );
          await t.commit();
          return ResponseHandler(201, "Invoice created successfully", invoice);
        } catch (error) {
          console.log(error);
          await t.rollback();
          return ResponseHandler(500, "Internal server error");
        }
      } else if (store.Wallet.xpub) {
        return ResponseHandler(
          403,
          "Sorry you have to have both Lightning and Bitcoin wallet at the moment in order to proceed"
        );
      } else if (store.Wallet.macaroon) {
        return ResponseHandler(
          403,
          "Sorry you have to have both Lightning and Bitcoin wallet at the moment in order to proceed"
        );
      } else {
        return ResponseHandler(500, "Internal Server error");
      }
    } else {
      return ResponseHandler(
        403,
        "You cannot create an invoice without a wallet"
      );
    }
  } else {
    return ResponseHandler(401, "You cannot create an invoice");
  }
};

export const GetInvoice = async (params: any) => {
  const server: any = process.env.LND_SERVER;
  const cert: any = process.env.CERT;
  const macaroon: any = process.env.MACAROON_HEX;
  try {
    const invoice = await models.Invoice.findOne({
      where: { uuid: params.id },
    });
    if (invoice) {
      const responseInvoice = {
        id: invoice.uuid,
        amount: invoice.amount,
        order_id: invoice.order_id,
        description: invoice.description,
        customer_email: invoice.customer_email,
        btc_address: invoice.btc_address,
        lightning_invoice: invoice.lightning_invoice,
        exchange_rate: invoice.exchange_rate,
        satoshi_paid: invoice.satoshi_paid,
        status: invoice.status,
        btc_amount: PriceConverter(invoice.exchange_rate, invoice.amount).btc,
      };
      if (invoice.status === "expired" || invoice.status === "paid") {
        return ResponseHandler(200, "Invoice details", responseInvoice);
      } else {
        if (new Date(invoice.createdAt).getTime() + 3600000 < Date.now()) {
          const updatedInvoice = await models.Invoice.update(
            { status: "expired" },
            { where: { uuid: invoice.uuid } }
          );
          if (updatedInvoice) {
            const changedInvoice = await models.Invoice.findOne({
              where: { uuid: invoice.uuid },
            });
            const updatedResponseInvoice = {
              id: changedInvoice.uuid,
              amount: changedInvoice.amount,
              order_id: changedInvoice.order_id,
              description: changedInvoice.description,
              customer_email: changedInvoice.customer_email,
              btc_address: changedInvoice.btc_address,
              lightning_invoice: changedInvoice.lightning_invoice,
              exchange_rate: changedInvoice.exchange_rate,
              satoshi_paid: changedInvoice.satoshi_paid,
              status: changedInvoice.status,
              btc_amount: PriceConverter(
                changedInvoice.exchange_rate,
                changedInvoice.amount
              ).btc,
            };
            return ResponseHandler(
              200,
              "Invoice Details",
              updatedResponseInvoice
            );
          } else {
            return ResponseHandler(500, "An error Occured");
          }
        } else {
          const isLightningSettled = await LookupInvoice(
            server,
            cert,
            macaroon,
            invoice.lightning_invoice_hash
          );
          const address_details = await BitcoinAddressChecker(
            invoice.btc_address
          );
          if (address_details.length === 0 && !isLightningSettled?.settled) {
            return ResponseHandler(200, "Invoice details", responseInvoice);
          } else {
            if (isLightningSettled?.settled) {
              try {
                const updateSettledInvoice = await models.Invoice.update(
                  {
                    status: "paid",
                    satoshi_paid:
                      parseInt(isLightningSettled?.value!) / 100000000,
                  },
                  { where: { uuid: invoice.uuid } }
                );
                const settledInvoice = await models.Invoice.findOne({
                  where: { uuid: invoice.uuid },
                });
                const settledInvoiceResponse = {
                  id: settledInvoice.uuid,
                  amount: settledInvoice.amount,
                  order_id: settledInvoice.order_id,
                  description: settledInvoice.description,
                  customer_email: settledInvoice.customer_email,
                  btc_address: settledInvoice.btc_address,
                  lightning_invoice: settledInvoice.lightning_invoice,
                  exchange_rate: settledInvoice.exchange_rate,
                  satoshi_paid: settledInvoice.satoshi_paid,
                  status: settledInvoice.status,
                  btc_amount: PriceConverter(
                    settledInvoice.exchange_rate,
                    settledInvoice.amount
                  ).btc,
                };
                return ResponseHandler(
                  200,
                  "Invoice Details",
                  settledInvoiceResponse
                );
              } catch (error) {
                console.log(error);
                return ResponseHandler(500, "Internal server error");
              }
            } else {
              try {
                const updateSettledInvoice = await models.Invoice.update(
                  {
                    status: "paid",
                    satoshi_paid: address_details[0].value / 100000000,
                  },
                  { where: { uuid: invoice.uuid } }
                );
                const settledInvoice = await models.Invoice.findOne({
                  where: { uuid: invoice.uuid },
                });
                const settledInvoiceResponse = {
                  id: settledInvoice.uuid,
                  amount: settledInvoice.amount,
                  order_id: settledInvoice.order_id,
                  description: settledInvoice.description,
                  customer_email: settledInvoice.customer_email,
                  btc_address: settledInvoice.btc_address,
                  lightning_invoice: settledInvoice.lightning_invoice,
                  exchange_rate: settledInvoice.exchange_rate,
                  satoshi_paid: settledInvoice.satoshi_paid,
                  status: settledInvoice.status,
                  btc_amount: PriceConverter(
                    settledInvoice.exchange_rate,
                    settledInvoice.amount
                  ).btc,
                };
                return ResponseHandler(
                  200,
                  "Invoice Details",
                  settledInvoiceResponse
                );
              } catch (error) {
                console.log(error);
                return ResponseHandler(500, "Internal Server error");
              }
            }
          }
        }
      }
    } else {
      return ResponseHandler(404, "Invoice  does not exist");
    }
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal server error");
  }
};

export const GetAllInvoice = async (body: any) => {
  try {
    const store = await models.Store.findOne({
      where: { userId: body.user.id },
    });
    const invoices = await models.Invoice.findAll({
      where: { storeUuid: store.uuid },
    });
    const responseInvoices: any = [];
    invoices.forEach((invoice: any) => {
      let newInvoice = {
        id: invoice.uuid,
        amount: invoice.amount,
        status: invoice.status,
        order_id: invoice.order_id,
        date: invoice.createdAt, // changed this to date, Tobi.
      };
      responseInvoices.push(newInvoice);
    });
    return ResponseHandler(200, "All Invoices", responseInvoices);
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "An error Occured");
  }
};
