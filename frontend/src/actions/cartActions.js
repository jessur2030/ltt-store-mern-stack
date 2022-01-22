import axios from "axios";
import { async } from "regenerator-runtime";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

//handle our add to cart request
//we will get id, qty : from the url
//getState: allows us to egt our entire state tree
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  //call local storage API
  //save as: "cartItems"
  //save our entire cart: getState()
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItem = (id) => async (dispatch, getState) => {
  ////remove item from cart
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//save shipping address action
//takes the form data
export const saveShippingAddress = (data) => async (dispatch) => {
  ////dispatch saveShippingAddress data
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

//save save payment method action
//takes the data from payment page selection
export const savePaymentMethod = (data) => async (dispatch) => {
  ////dispatch saveShippingAddress data
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
