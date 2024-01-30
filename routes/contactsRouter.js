import express from "express";
import {
  validateCreateContactBody,
  validateUpdateContactBody,
} from "../helpers/validateBody.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContacts,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateCreateContactBody, createContact);

contactsRouter.put("/:id", validateUpdateContactBody, updateContacts);

export default contactsRouter;
