import { User } from "../model/userModel.js";
import { jwtService } from "../services/jwtService.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";

export const signup = async (userData) => {
  const newUser = await User.create({
    ...userData,
  });
  const token = jwtService.signToken(newUser.id);
  newUser.token = token;
  await newUser.save();

  return { user: newUser, token };
};
export const checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);
  return userExists;
};
export const updateUserToken = (id, body) => User.findByIdAndUpdate(id, body);
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw HttpError(401, "Email or password is wrong");

  const isPasswordValid = await user.checkPassword(password, user.password);

  if (!isPasswordValid) throw HttpError(401, "Email or password is wrong..");

  user.password = undefined;

  const token = jwtService.signToken(user.id);

  return { user, token };
};
export const getUserById = (id) => User.findById(id);

export const logout = async (token) => {
  if (!token) {
    throw new HttpError(401, "Not authorized");
  }
  const userId = jwtService.checkToken(token);

  if (!userId) throw HttpError(401, "Not authorized");

  const currentUser = await getUserById(userId);
  console.log(currentUser);
  if (!currentUser) throw HttpError(401, "Not authorized");

    currentUser.token = null;
    await currentUser.save();
    return;
};

export * as userService from "./userService.js";
