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
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";
//product list reducer
//handle the state for the product list
export const productListReducer = (state = { products: [] }, action) => {
  //
  switch (action.type) {
    //if is currency fetching
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    ///if product is fetch successful
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    ///if we get an error
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//product detail reducer
//handle the state for the product detail
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  //
  switch (action.type) {
    //if is currency fetching
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    ///if product is fetch successful
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    ///if we get an error
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Pending BUG: on deleted product state
//productDeleteReducer
export const productDeleteReducer = (state = {}, action) => {
  //action type
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//productCreateReducer
export const productCreateReducer = (state = {}, action) => {
  //action.type
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//product update reducer
//productUpdate reducer
export const productUpdateReducer = (state = { product: {} }, action) => {
  //action.type
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
