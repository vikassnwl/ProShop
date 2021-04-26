import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  let items;
  switch (action.type) {
    case CART_ADD_ITEM:
      items = [...state.cartItems];
      const item = action.payload;

      for (var i = 0; i < items.length; i++) {
        if (items[i].product === item.product) {
          break;
        }
      }
      items[i] = item;

      return { ...state, cartItems: items };

    case CART_REMOVE_ITEM:
      items = [...state.cartItems];
      const productId = action.payload;

      for (let i = 0; i < items.length; i++) {
        if (items[i].product === productId) {
          items.splice(i, 1);
          break;
        }
      }

      return { ...state, cartItems: items };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
