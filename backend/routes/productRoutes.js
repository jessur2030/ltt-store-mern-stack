import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

//@desc Fetch all Products //@route GET /api/products //@access Public
//@desc Crate a sample product //@route POST /api/products //@access Private/admin
router.route("/").get(getProducts).post(protect, admin, createProduct);

//@desc Crate a product review //@route POST /api/products/:id/reviews //@access Private
router.route("/:id/reviews").post(protect, createProductReview);

//@desc Fetch a single Product by its id //@route GET /api/products/:id //@access Public
//@desc Update a single Product by its id //@route PUT /api/products/:id //@access  Private/admin
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
