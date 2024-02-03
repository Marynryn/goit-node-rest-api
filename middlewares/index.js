import { catchAsync } from "../helpers/catchAsync.js";
import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import {
  validateUpdateContactBody,
  validateCreateContactBody,
  validatePatchContactSchema,
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
  if (!Types.ObjectId.isValid(req.params.id)) {
    throw new HttpError(404, "Contact not found.");
  }
  req.body = value;
  next();
});

export const checkContactId = catchAsync(async (req, res, next) => {
  await contactsServices.checkContactId(req.params.id);

  next();
});
export const checkStatusContactBody = catchAsync(async (req, res, next) => {
  const { value, error } = validatePatchContactSchema(req.body);
  if (error) {
    console.error("Validation Error:", error);
    return res.status(400).json({ message: error.message });
  }
  if (!Types.ObjectId.isValid(req.params.id)) {
    throw new HttpError(404, "Contact not found.");
  }
  req.body = value;
  next();
});

export * as middleware from "./index.js";
