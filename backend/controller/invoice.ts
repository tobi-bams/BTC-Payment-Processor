import { ResponseHandler } from "../utils";
const joi = require("joi");
const models = require("../models");
import { BtcExchangeValue, PriceConverter } from "../utils";
import { deriveBitcoinAddress } from "../utils/bitcoinAddressDeriavation";
import { GenerateInvoice } from "../utils/lightning";

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
      console.log(exchangeValue);
      const bitcoin = PriceConverter(exchangeValue, 600);
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
          bitcoin.btc,
          body.description
        );
        const t = await models.sequelize.transaction();
        try {
          const invoice = await models.Invoice.create(
            {
              amount: body.amount,
              orderId: body.orderId,
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
      return ResponseHandler(200, "Invoice details", responseInvoice);
    } else {
      return ResponseHandler(404, "Invoice  does not exist");
    }
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal server error");
  }
};
