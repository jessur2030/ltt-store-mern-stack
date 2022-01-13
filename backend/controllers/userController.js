import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Auth user and get Token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find one document in db that match input email
  const user = await User.findOne({ email });
  //check for user, and try to match for the entered plain text password to
  //the encrypted password in User model
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if user exits in our db records: if it exits throw error
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error(
      "There was a problem creating user account. User already exits."
    );
  }

  //if new user email doest not exits in our db records:
  //create and insert user data from the body
  //create takes an object of what we want to create
  const user = await User.create({ name, email, password });

  if (user) {
    //send created status and user fields
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Auth user and get Token
//@route POST /api/users/login
//@access Public
const getUserProfile = asyncHandler(async (req, res) => {
  //
  const user = await User.findById(req.user._id);

  //check for the user
  //what we want getUserProfile to return:
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { authUser, registerUser, getUserProfile };
