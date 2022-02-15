import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
} from "../constants/productConstants";

//fetch our product, and dispatch action to our combineReducers in
//our productList reducer
//actions creator function: listProducts
export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      //dispatch our request
      dispatch({ type: PRODUCT_LIST_REQUEST });

      //make our request
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      //dispatch PRODUCT_LIST_SUCCESS
      //send as payload: data
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        //get error from our backend errors and have then in our
        //frontend state
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//fetch our product, and dispatch action to our combineReducers in
//our productList reducer
//actions creator function: listProducts
export const listProductsDetails = (id) => async (dispatch) => {
  try {
    // const id = useParams();
    //dispatch our request
    //sets loading to: true
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    //make our request
    const { data } = await axios.get(`/api/products/${id}`);

    //dispatch PRODUCT_LIST_SUCCESS
    //send as payload: data
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      //get error from our backend errors and have then in our
      //frontend state
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    //dispatch our delete request
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    //GET TOKEN FROM THE STATE
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

    //fetch delete request
    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });

    //dispatch updated product list
    // dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//createProduct action
export const createProduct = () => async (dispatch, getState) => {
  try {
    //dispatch our request
    dispatch({ type: PRODUCT_CREATE_REQUEST });

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

    //fetch post request /api/products
    const { data } = await axios.post(`/api/products`, {}, config);

    // dispatch data payload
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update product action
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    //dispatch request
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    //get token form the state
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

    //fetch update product request /api/product/:id
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    //dispatch success request
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });

    // //dispatch updated product to the state
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible error
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//createProductReview action
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      //dispatch our request
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      //get token form the state
      const {
        userLogin: { userInfo },
      } = getState();

      //send our headers
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //fetch /api/products/id:/reviews
      await axios.post(`/api/products/${productId}/reviews`, review, config);

      //dispatch success
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      //dispatch possible error
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//list top rated products action
export const listTopRatedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_RATED_REQUEST });

    //FETCH /api/products/top
    const { data } = await axios.get("/api/products/top");

    //dispatch data on success
    dispatch({ type: PRODUCT_TOP_RATED_SUCCESS, payload: data });
  } catch (error) {
    //dispatch possible errors
    dispatch({
      type: PRODUCT_TOP_RATED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
