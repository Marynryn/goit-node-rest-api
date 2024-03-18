import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";

export const signToken = (id) =>
  jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "5h",
  });

export const checkToken = (token) => {
  console.log(token);
  if (!token) throw HttpError(401, "Not authorized in..");

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    console.log(id);
    return id;
  } catch (err) {
    throw HttpError(401, "Not authorized  5");
  }
};

export * as jwtService from "./jwtService.js";
