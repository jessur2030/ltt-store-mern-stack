import mongoose from "mongoose";

//create reviews Schema: reviewSchema
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    //Associates the user with the review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //ref: reference a specific model for objectID : User
      //this adds a relationship between the Product and the User
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//create product Schema: productSchema
const productSchema = mongoose.Schema(
  {
    //object {} : in this object is where we want
    //to define all the fields that we want for a order

    //user field: for user who creates the product
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      //reference from User: this
      //adds a relationship between the product and the user
      ref: "User",
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    //reviews: reviews is an array of reviews objects
    reviews: [reviewSchema],
    //rating: avg rating of all the rating that are in the reviews
    rating: { type: Number, required: true, default: 0 },
    //numReviews: tracks number of reviews
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

//crates Product model from product schema
const Product = mongoose.model("Product", productSchema);

//export Product model
export default Product;
