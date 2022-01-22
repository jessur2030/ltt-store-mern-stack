import asyncHandler from "express-async-handler";
import Order from "../models/userModel.js";

//@desc Create new order
//@route POST api/orders
//@access PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
  //get order from the body and destructure req.body
  const {
    //orderItems: array of items that get send
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  //make sure that orderItems is not empty
  if (orderItems && orderItems.length === 0) {
    //bad request
    res.status(400);
    throw new Error(`Order is items`);
    return;
  } else {
    //create a new order in our database
    const order = new Order({
      orderItems,
      //in addition: we get user token: user _id
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    //save in our database
    const createdOrder = await order.save();
    //send create status: res.status(201)
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
