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

export const patchContactSchema = Joi.object({
  favorite: Joi.bool().required(),
});
export const validateStatusContactBody = (req, res, next) => {
  const { error } = patchContactSchema.validate(req.body);
  if (error) {
    console.error("Validation Error:", error);
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};
