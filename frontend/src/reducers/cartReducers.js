import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from "../constants/cartConstants";

//cart add item reducer
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  //check action type
  switch (action.type) {
    case CART_ADD_ITEM:
      //put the payload in: item
      const item = action.payload;
      //lets find if it exist
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        //
        return {
          //...state: return whatever is in the state:
          ...state,
          //map through the current car items
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        //if it doest exit in cart : push it to cartItems []

        return {
          //...state: return whatever is in the state:
          ...state,
          //cartItems: set it to an array with current items, and
          //item: add the new item
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        // return initial state
        ...state,
        //add shippingAddress
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        // return initial state
        ...state,
        //add paymentMethod
        paymentMethod: action.payload,
      };
    case CART_RESET:
      return { cartItems: [] };
    default:
      return state;
  }
};
