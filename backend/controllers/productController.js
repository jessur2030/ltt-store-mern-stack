import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//change app to : router
//we dont need /api/products/ :  because
//we are going to point it to this file
//@desc Fetch all Products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
  //find({}): passing an empty object in give us everything
  const products = await Product.find({});

  res.json(products);
});

//change app to : router
//we dont need /api/products/ :  because
//we are going to point it to this file
//@desc Fetch a single Product by its id
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  //findById: find by id in the database
  //req.params.id: give us whatever the id that its in the URL
  const product = await Product.findById(req.params.id);
  //const product = products.find((p) => p._id === req.params.id);

  //checks if there is a product
  if (product) {
    res.json(product);
  } else {
    //if there is no product: res with 404 and a message:
    res.status(404);
    throw new Error(`Product Not Found`);
  }
});

export { getProducts, getProductById };
