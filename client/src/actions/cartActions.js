import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

import axios from "axios";

/**
 * Cart related functions to connect to the server/API
 */

export const addToCart = (id, prod, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/stores/${id}/products/${prod}`);
  const product = data.product;
  const store = data.store;

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: product._id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      filename: product.filename,
      qty,
      countInStock: product.countInStock,
      storeId: store._id,
      storeName: store.name,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const clearCartItems = () => (dispatch) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
  });

  localStorage.removeItem("cartItems");
};
