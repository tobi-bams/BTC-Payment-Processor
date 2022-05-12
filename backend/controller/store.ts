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
    const storeExist = await models.Store.findOne({
      where: { userId: user.id },
    });
    if (!storeExist) {
      const store = await models.Store.create({
        name,
        userId: user.id,
      });
      return ResponseHandler(201, "Store Created Successfully", store);
    } else {
      return ResponseHandler(
        401,
        "You can't create more than one Store at the moment"
      );
    }
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "An Error Occured");
  }
};
