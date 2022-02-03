import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

////@desc POST register user //@route POST  /api/users //@access Public
////@desc GET  all user admin only //@route GET  /api/users //@access PRIVATE
router.route("/").post(registerUser).get(protect, admin, getUsers);

//@desc POST login user //@route POST  /api/users/login
router.post("/login", authUser);

//@desc GET user Profile //@route GET  /api/users/profile //@access PRIVATE/Admin
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//@desc DELETE a user //@desc GET a user by Id   //@desc PUT a user by Id  //@access PRIVATE/Admin
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
