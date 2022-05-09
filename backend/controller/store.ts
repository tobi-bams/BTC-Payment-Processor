import { ResponseHandler } from "../utils";
const joi = require("joi");
const models = require("../models");

export const CreateStore = async (name: string, user: any) => {
  const schema = joi.object({
    name: joi.string().required(),
  });

  const validation = schema.validate({ name });
  if (validation.error) {
    return ResponseHandler(422, validation.error.details[0].message);
  }
  try {
    const store = await models.Store.create({
      name,
      userId: user.id,
    });
    return ResponseHandler(201, "Store Created Successfully", store);
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "An Error Occured");
  }
};
