import Joi from "joi";

export const newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});