import Joi from "joi";

export const joiValidator = (validator) => (data) => {
  const { error, value } = validator(data);

  if (!error) return { value };

  return {
    value,
    error: error.details.map((err) => err.message),
  };
};

export const validateCreateContactBody = joiValidator((data) =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
  }).validate(data)
);

export const validateUpdateContactBody = joiValidator((data) =>
  Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.bool(),
  }).validate(data)
);

export const validatePatchContactSchema = joiValidator((data) =>
  Joi.object({
    favorite: Joi.bool().required(),
  }).validate(data)
);
