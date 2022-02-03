import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Auth user and get Token controller function
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

//@desc register user controller function
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

//@desc get user profile controller function
//@route GET /api/users/profile
//@access PRIVATE
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

//@desc update user profile controller function
//@route PUT /api/users/profile
//@access PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  //
  const user = await User.findById(req.user._id);

  //check for the user
  //what we want updateUserProfile to return:
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    //check if a password was send
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc Get users admin only
//@route GET /api/users
//@access PRIVATE/Admin
const getUsers = asyncHandler(async (req, res) => {
  //get all users
  const users = await User.find({});

  //response with all users
  res.json(users);
});

//@desc DELETE a user
//@route DELETE /api/users/:id
//@access PRIVATE/Admin
const deleteUser = asyncHandler(async (req, res) => {
  //get all users
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: `User removed` });
  } else {
    res.status(404);
    throw new Error(`User not found`);
  }
});

//@desc Get user by Id
//@route GET /api/users:id
//@access PRIVATE/Admin
const getUserById = asyncHandler(async (req, res) => {
  //get user by Id
  const user = await User.findById(req.params.id).select("-password");

  //check if user exits
  if (user) {
    res.json(user);
  } else {
    //if user is not found
    res.status(404);
    throw new Error(`User not found`);
  }
});

//@desc update user by id
//@route PUT /api/users/:id
//@access PRIVATE/Admin
const updateUser = asyncHandler(async (req, res) => {
  //find user by id
  const user = await User.findById(req.params.id);

  //check if user exits
  if (user) {
    //if user if found
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    //allows th admin user to change admin field
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
