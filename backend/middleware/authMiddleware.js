import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//validate our jwt: to protect our private routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("token found");
  }
  try {
    token = req.headers.authorization.split(" ")[1];

    //try to decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorize, token failed");
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorize, token not found ");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    //if true: continue and move on
    next();
  } else {
    //Not authorized
    res.status(401);
    throw new Error(`Not authorized, as an admin`);
  }
};

export { protect, admin };
