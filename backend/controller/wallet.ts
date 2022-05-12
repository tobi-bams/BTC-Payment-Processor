import { ResponseHandler, ValidateXpubKey } from "../utils";
const models = require("../models");

interface CreateBitcoinWallet {
  xpub: string;
  storeId: string;
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
                "Bitcoin Wallet Updated Successfully"
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
              "Bitcoin Wallet Successfully Created",
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
