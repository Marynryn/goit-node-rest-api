import { catchAsync } from "../helpers/catchAsync.js";
import { jwtService } from "../services/jwtService.js";
import { userService } from "../services/userService.js";

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = jwtService.checkToken(token);

  if (!userId) throw HttpError(401, "Not authorized");

  const currentUser = await userService.getUserById(userId);

  if (!currentUser) throw HttpError(401, "Not authorized");

  req.user = currentUser;
  console.log(req.user);
  next();
});
// export const allowFor = (...roles) =>
//   (req, res, next) => {
//     // roles === ['user', 'admin']
//     if (roles.includes(req.user.role)) return next();

//     next(new HttpError(403, "You are not allowed to perform this action.."));
//   };
