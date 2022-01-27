import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//@desc Create New order
//@route GET  /api/orders
//@access PRIVATE route
const addOrderItems = asyncHandler(async (req, res) => {
  //get from the body and destructure from req.body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //check if orderItems array is 0:
  if (orderItems && orderItems.length === 0) {
    //bad request
    res.status(400);
    throw new Error(`No order items`);
    return;
  } else {
    //create a new order in the database
    const order = new Order({
      orderItems,
      //In addition, we want the login user: we get the user a token
      //and we will get the user id from the token
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    //to save in database
    const createdOrder = await order.save();
    //res.status(201): created
    res.status(201).json(createdOrder);
  }
});

//@desc  Get order by id
//@route GET /api/orders/:id
//@access PRIVATE route
const getOrderById = asyncHandler(async (req, res) => {
  //fetch order : find order by id in our database
  //in Addition to the order information : we want to get the user name and email
  //use populate() from mongo: populate from "user": second argument the field the we want
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error(`Order not found`);
  }
});

//@desc  Update order to paid
//@route PUT /api/orders/:id/pay
//@access PRIVATE route
const updateOrderToPaid = asyncHandler(async (req, res) => {
  //fond the order by id in our database
  const order = await Order.findById(req.params.id);

  //check if order is found
  if (order) {
    //if order exits: set properties for paid order
    order.isPaid = true;
    order.paidAt = Date.now();
    //paymentResult : from paypal response
    order.paymentResult = {
      //this object will be added from PayPal
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    //add more if we need to use another payment method

    //save updated order to our database
    const updatedOrder = await order.save();
    //response back the updatedOrder
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc  Get user profile orders
//@route GET /api/orders/myorders
//@access PRIVATE route
const getMyOrders = asyncHandler(async (req, res) => {
  //fond the order by id in our database
  //only the login user: only find orders where the user : req.user._id
  const orders = await Order.find({ user: req.user._id });
  //response back to user
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
