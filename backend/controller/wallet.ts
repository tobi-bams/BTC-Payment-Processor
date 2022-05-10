import { ResponseHandler } from "../utils";
import { ValidateXpubKey } from "../utils";

export const CreateWallet = (xpub: string) => {
  const validation = ValidateXpubKey(xpub);
  if (validation) {
    //  Todo
    // Insert Xpub key inside wallet table
    const data = { xpub };
    return ResponseHandler(201, "Wallet Successfully Created", data);
  } else {
    return ResponseHandler(422, "Xpub Key Incorrect");
  }
};
