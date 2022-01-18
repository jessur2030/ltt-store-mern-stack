import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

////@desc POST register user
//@route POST  /api/users
//@access Public
router.route("/").post(registerUser);

//@desc POST login user
//@route POST  /api/users/login
//@access Public
router.post("/login", authUser);

//@desc GET user Profile
//@route GET  /api/users/profile
//@access PRIVATE route
//to use protect middleware:
//pass protect middleware as first argument
// // router.route("/profile").get(protect, getUserProfile);
//get user profile,
// if its a PUT res: add put() updateUserProfile into this
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
