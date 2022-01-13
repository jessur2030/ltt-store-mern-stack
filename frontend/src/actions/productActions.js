import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

//fetch our product, and dispatch action to our combineReducers in
//our productList reducer
//actions creator function: listProducts
export const listProducts = () => async (dispatch) => {
  try {
    //dispatch our request
    dispatch({ type: PRODUCT_LIST_REQUEST });

    //make our request
    const { data } = await axios.get("/api/products");

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
