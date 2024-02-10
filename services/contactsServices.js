import { Contact } from "../model/contactModel.js";

import HttpError from "../helpers/HttpError.js";

export const getContactsList = (ownerId) => Contact.find({ owner: ownerId });

export const getContactById = (id, ownerId) =>
  Contact.findOne({ _id: id, owner: ownerId });

export const removeContact = (id) =>
  Contact.findByIdAndDelete(id);

export const addContact = (body, ownerId) => {
  body.owner = ownerId;
  return Contact.create(body);
};

export const updateContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });

export const updateStatusContact = (id, body) =>
  Contact.findByIdAndUpdate(id,  body, { new: true });

export const checkContactExists = async (filter, throwError = true) => {
  const contactExists = await Contact.exists(filter);
  if (contactExists && throwError) {
    throw HttpError(409, "User already exists..");
  }
  return contactExists;
};
export * as contactsServices from "./contactsServices.js";
