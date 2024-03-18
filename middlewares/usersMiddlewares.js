import { catchAsync } from "../helpers/catchAsync.js";
import { jwtService } from "../services/jwtService.js";
import { userService } from "../services/userService.js";
import { ImageService } from "../services/imageService.js";
import HttpError from "./../helpers/HttpError.js";

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = jwtService.checkToken(token);
  console.log(userId);
  if (!userId) throw HttpError(401, "Not authorized 1");
  const currentUser = await userService.getUserById(userId);
  console.log("1");
  if (!currentUser) {
    console.log("2");
    throw HttpError(401, "Not authorized 2");
  }

  if (currentUser.token != token) {
    console.log("3");
    throw HttpError(401, "Not authorized 3");
  }

  req.user = currentUser;
  next();
});

export const uploadAvatar = ImageService.initUploadImageMiddleware("avatar");
