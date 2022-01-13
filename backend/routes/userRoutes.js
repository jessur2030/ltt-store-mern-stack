import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
//change app to : router
//we dont need /api/products/ :  because
//we are going to point it to this file
//@desc Fetch all Products
//@route GET /api/products
//@access Public
router.post("/login", authUser);

router.route("/profile").get(protect, getUserProfile);

export default router;
