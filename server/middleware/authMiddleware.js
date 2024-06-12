/**
 * route level middlewares to validate the user
 * when we decode the token we get access to tokens payload data.
 * from that we can get the userinfo such as id,
 * we need to find that payload info is valid.
 * we are checking with the db whether user is valid.
 *
 *
 */
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, "decoded data");
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("requested user", req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { admin, protect };
