import { catchAsync } from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import {
  validateUpdateContactBody,
  validateCreateContactBody,
} from "../schemas/contactsSchemas.js";

import { contactsServices } from "../services/contactsServices.js";

export const checkCreateContactData = catchAsync(async (req, res, next) => {
  const { value, error } = validateCreateContactBody(req.body);

  if (error) throw new HttpError(400, "Invalid user data..", error);

  await contactsServices.checkContactExists({ email: req.body.email });

  req.body = value;

  next();
});

export const checkUpdateContactData = catchAsync(async (req, res, next) => {
  const { value, error } = validateUpdateContactBody(req.body);
  if (error) {
    console.error("Request body:", req.body);
    throw new HttpError(400, "Invalid user data..", error);
  }
  const existingContact = await contactsServices.checkContactExists(
    {
      _id: { $ne: req.params.id },
    },
    false
  );

  if (!existingContact) {
    throw new HttpError(404, "Contact not found.");
  }
  req.body = value;
  next();
});

export const checkContactId = catchAsync(async (req, res, next) => {
  await contactsServices.checkContactId(req.params.id);

  next();
});
export * as middleware from "./index.js";
