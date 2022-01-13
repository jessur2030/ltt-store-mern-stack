import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

//cart add item reducer
export const cartReducer = (state = { cartItems: [] }, action) => {
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
    default:
      return state;
  }
};
