import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

//change app to : router
//we dont need /api/products/ :  because
//we are going to point it to this file
//@desc Fetch all Products
//@route GET /api/products
//@access Public
router.route("/").get(getProducts);

//change app to : router
//we dont need /api/products/ :  because
//we are going to point it to this file
//@desc Fetch a single Product by its id
//@route GET /api/products/:id
//@access Public
router.route("/:id").get(getProductById);

export default router;
