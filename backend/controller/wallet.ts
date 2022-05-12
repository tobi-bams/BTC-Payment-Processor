import { ResponseHandler, ValidateXpubKey, ValidateMacaroon } from "../utils";
const models = require("../models");

interface CreateBitcoinWallet {
  xpub: string;
}

interface CreateLigWallet {
  macaroon: string;
}

export const CreateBitcoinWallet = async (
  body: CreateBitcoinWallet,
  params: any
) => {
  const validation = ValidateXpubKey(body.xpub);
  if (validation) {
    //  Todo
    // Insert Xpub key inside wallet table
    const data = { xpub: body.xpub };

    try {
      const storeExist = await models.Store.findOne({
        where: { uuid: params.storeId },
      });
      if (storeExist) {
        const xpubExist = await models.Wallet.findOne({
          where: { xpub: body.xpub },
        });
        if (xpubExist) {
          return ResponseHandler(422, "Invalid Extended Public key");
        } else {
          const wallet = await models.Wallet.findOne({
            where: { storeUuid: params.storeId },
          });
          if (wallet) {
            if (wallet.xpub || wallet.currentIndex || wallet.derivationPath) {
              return ResponseHandler(422, "Invalid Extended Public Key");
            } else {
              const updateWallet = await models.Wallet.update(
                {
                  xpub: body.xpub,
                  currentIndex: 0,
                  derivationPath: `0/`,
                },
                { where: { storeUuid: params.storeId } }
              );
              return ResponseHandler(
                201,
                "Bitcoin Watch Only Wallet Updated Successfully"
              );
            }
          } else {
            const bitcoinWallet = await models.Wallet.create({
              xpub: body.xpub,
              currentIndex: 0,
              derivationPath: `0/`,
              storeUuid: params.storeId,
            });
            return ResponseHandler(
              201,
              "Bitcoin Watch Only Wallet Successfully Created",
              bitcoinWallet
            );
          }
        }
      } else {
        return ResponseHandler(401, "Invalid User");
      }
    } catch (error) {
      console.log(error);
      return ResponseHandler(500, "Internal Server Error");
    }
  } else {
    return ResponseHandler(422, "Xpub Key Incorrect");
  }
};

export const CreateLighningWallet = async (
  body: CreateLigWallet,
  params: any
) => {
  const testMacroon = ValidateMacaroon(body.macaroon);
  if (testMacroon) {
    try {
      const storeExist = await models.Store.findOne({
        where: { uuid: params.storeId },
      });
      if (storeExist) {
        const userWallet = await models.Wallet.findOne({
          where: { storeUuid: params.storeId },
        });
        if (userWallet) {
          if (!userWallet.macaroon) {
            const updateWallet = await models.Wallet.update(
              { macaroon: body.macaroon },
              { where: { storeUuid: params.storeId } }
            );
            return ResponseHandler(
              210,
              "Lightning Watch Only Wallet Created Successfully"
            );
          } else {
            return ResponseHandler(422, "Invalid Macaroon");
          }
        } else {
          const lightningWallet = await models.Wallet.create({
            macaroon: body.macaroon,
            storeUuid: params.storeId,
          });
          return ResponseHandler(
            201,
            "Lightning Watch Only Wallet Created Successfully"
          );
        }
      } else {
        return ResponseHandler(401, "Invalid User");
      }
    } catch (error) {
      console.log(error);
      return ResponseHandler(500, "Internal Server Error");
    }
  } else {
    return ResponseHandler(422, "Invalid Macaroon");
  }
};
