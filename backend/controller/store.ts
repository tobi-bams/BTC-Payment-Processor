import { ResponseHandler } from "../utils";

export const CreateStore = async (user: any) => {
  return ResponseHandler(201, "Store Created Successfully", user);
};
