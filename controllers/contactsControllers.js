import * as contactsServices from "../services/contactsServices.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactsServices.getContactsList();
  res.status(200).json(contacts);
});

export const getOneContact = catchAsync(async (req, res) => {
  const contactById = await contactsServices.getContactById(req.params.id);
  res.status(200).json(contactById);
});

export const deleteContact = catchAsync(async (req, res) => {
  const contact = await contactsServices.removeContact(req.params.id);
  res.sendStatus(204).json(contact);
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = await contactsServices.addContact(req.body);
  res.status(201).json(newContact);
});

export const updateContacts = catchAsync(async (req, res) => {
  const updatedContact = await contactsServices.updateContact(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

export const updateStatusContact = catchAsync(async (req, res) => {
  const { favorite } = req.body;
  const result = await contactsServices.updateStatusContact(
    req.params.id,
    { favorite },
    { new: true }
  );
  res.status(200).json(result);
});
