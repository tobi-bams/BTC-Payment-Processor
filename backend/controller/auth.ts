import { ResponseHandler } from "../utils";
const models = require("../models");
import bcrypt from "bcrypt";
const joi = require("joi");
export const SignIn = () => {};

export const SignUp = async (email: string, password: string) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const validation = schema.validate({
    email,
    password,
  });

  if (validation.error) {
    return ResponseHandler(422, validation.error.details[0].message);
  }
  try {
    const userExist = await models.User.findOne({ where: { email } });
    if (userExist) {
      return ResponseHandler(409, "User Already Exist");
    }
    await models.User.create({
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      role: "user",
    });
    return ResponseHandler(200, "Account Created Successfully");
  } catch (error) {
    return ResponseHandler(500, "An Error Occured");
  }
};
