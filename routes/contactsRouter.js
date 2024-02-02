import express from "express";
import * as middleware from "../middlewares/index.js";
import { validateStatusContactBody } from "../schemas/contactsSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContacts,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", middleware.checkCreateContactData, createContact);

contactsRouter.put("/:id", middleware.checkUpdateContactData, updateContacts);

contactsRouter.patch(
  "/:id/favorite",
  validateStatusContactBody,
  updateStatusContact
);

export default contactsRouter;
