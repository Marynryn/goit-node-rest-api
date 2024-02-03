import * as contactsServices from "../services/contactsServices.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactsServices.getContactsList();
  res.status(200).json(contacts);
});

export const getOneContact = catchAsync(async (req, res) => {
  const isContactValid = await contactsServices.checkContactId(req.params.id);

  if (!isContactValid) {
    return res.status(404).json({
      msg: "Not found..",
    });
  } else {
    const contactById = await contactsServices.getContactById(req.params.id);

    res.status(200).json(contactById);
  }
});

export const deleteContact = catchAsync(async (req, res) => {
  const isContactValid = await contactsServices.checkContactId(req.params.id);

  if (!isContactValid) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  const removedContact = await contactsServices.removeContact(req.params.id);

  res.status(200).json(removedContact);
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
