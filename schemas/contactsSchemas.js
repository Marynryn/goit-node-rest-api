import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
  owner: Joi.string(),
  favorite: Joi.bool(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  number: Joi.string(),
  favorite: Joi.bool(),
});
export const updateStatusContactSchema = Joi.object({
  favorite: Joi.bool().required(),
});
