import mongoose from "mongoose";

//create order Schema: orderSchema
const orderSchema = mongoose.Schema(
  {
    //object {} : in this object is where we want
    //to define all the fields that we want for order

    //user that buys the product
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    //order items field : an array of order items
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        //product: an objectid linked with the product model
        //create a relationship with the product
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    //shippingAddress: has multiple umbered objects
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    //paymentResult: coming from paypal
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },

    // isShipped: { type: Boolean, required: true, default: false },

    // shippedAt: {
    //   type: Date,
    // },

    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

//crates order model from order schema
const Order = mongoose.model("Order", orderSchema);

//export Order model
export default Order;
