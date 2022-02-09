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

//@desc Delete a product by Id
//@route DELETE /api/products/:id
//@access PRIVATE/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  //find a product by Id
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: `Product removed` });
  } else {
    res.status(404);
    throw new Error(`Product not found`);
  }
});

//@desc Create a product
//@route POST /api/products
//@access PRIVATE/Admin
const createProduct = asyncHandler(async (req, res) => {
  //instantiate a new product
  const product = new Product({
    //sample data
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: " Sample description",
  });

  //save product to our database
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc Edit a product
//@route PUT /api/products/:id
//@access PRIVATE/Admin
const updateProduct = asyncHandler(async (req, res) => {
  //get product from the body
  const { name, price, image, brand, description, category, countInStock } =
    req.body;
  //find product by Id
  const product = await Product.findById(req.params.id);

  //if there is a product
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  }
  //if there is not product found
  else {
    res.status(404);
    throw new Error({ message: `Product not found` });
  }
});

//@desc Create a product review
//@route POST /api/products/:id/reviews
//@access PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  //get the rating and the comment from the body
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  //check if product exits
  if (product) {
    //check if user has already submitted a review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    //if user didn't already add a review: construct a review object
    const review = {
      name: req.user.name,
      //Number(rating): make rating number
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    //push the new review: to our array of reviews
    product.reviews.push(review);

    //updates numReviews field
    product.numReviews = product.reviews.length;

    //updates total rating field:
    //add rating and / by total rating of reviews
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    //save to our database
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
