import { Contact } from "../model/contactModel.js";
import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";

export const getContactsList = () => Contact.find();
export const getContactById = (id) => Contact.findById(id);
export const removeContact = (id) => Contact.findByIdAndDelete(id);
export const addContact = (body) => Contact.create(body);

export const updateContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });

export const updateStatusContact = (id, { favorite }) =>
  Contact.findByIdAndUpdate(id, { $set: { favorite } }, { new: true });

export const checkContactId = async (id) => {
  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw new HttpError(404, "User not found..");

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw new HttpError(404, "User not found..");
};
export const checkContactExists = async (filter, throwError = true) => {
  const contactExists = await Contact.exists(filter);
  if (contactExists && throwError) {
    throw new HttpError(409, "User already exists..");
  }
  return contactExists;
};
export * as contactsServices from "./contactsServices.js";
