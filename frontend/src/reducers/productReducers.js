import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
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

//product details reducer
//handle the state for the product details
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: [] };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
