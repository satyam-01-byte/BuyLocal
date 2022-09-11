import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Store from "../models/storeModel.js";

//authentication module

const protectUser = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorised, invalid token");
    }
  }
  if (req.headers["access-control-request-headers"] === "content-type")
    return next();
  else if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token!");
  }
});

const protectSeller = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.seller = await Store.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorised, invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorised, no token!");
  }
});

export { protectUser, protectSeller };
