import axios from "axios";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from "../constants/orderContants";

//orderCreate Action function
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: ORDER_CREATE_REQUEST });

    //destructure userLogin and get : token
    const {
      userLogin: { userInfo },
    } = getState();

    //
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //make request to /api/orders: pass in the : order object,
    // along with our headers and user token
    const { data } = await axios.post("/api/orders", order, config);

    //dispatch new order
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      //newly create order: data
      payload: data,
    });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//orderDetails action
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: ORDER_DETAILS_REQUEST });

    //destructure userInfo from the state
    const {
      userLogin: { userInfo },
    } = getState();

    //send our headers & token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //fetch order details data
    const { data } = await axios.get(`/api/orders/${id}`, config);

    //dispatch our data
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//pay order action
export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      //dispatch our request
      dispatch({ type: ORDER_PAY_REQUEST });

      //GET userIfo from the state
      const {
        userLogin: { userInfo },
      } = getState();

      //send our headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //fetch our request to update our pay order
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      //dispatch our data from our fetch request
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      //dispatch possible error
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//get user list orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    //GET USER TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    //auth headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //fetch order list data
    const { data } = await axios.get(`/api/orders/myorders`, config);

    //dispatch order list data
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//listOrders action
export const listOrders = () => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: ORDER_LIST_REQUEST });

    //get token from state
    const {
      userLogin: { userInfo },
    } = getState();

    //send our headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //fetch /api/orders admin route
    const { data } = await axios.get(`/api/orders`, config);
    console.log(data);
    //dispatch data
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
