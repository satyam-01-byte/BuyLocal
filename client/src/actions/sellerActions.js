import axios from "axios";
import {
  SELLER_LOGIN_FAIL,
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGOUT,
  SELLER_REGISTER_FAIL,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
  SELLER_ADD_PRODUCT_FAIL,
  SELLER_ADD_PRODUCT_REQUEST,
  SELLER_ADD_PRODUCT_SUCCESS,
  SELLER_PRODUCT_FILTER_FAIL,
  SELLER_PRODUCT_FILTER_REQUEST,
  SELLER_PRODUCT_FILTER_SUCCESS,
  SELLER_GET_ORDERS_FAIL,
  SELLER_GET_ORDERS_REQUEST,
  SELLER_GET_ORDERS_SUCCESS,
  ORDER_ACCEPT_REQUEST,
  ORDER_ACCEPT_SUCCESS,
  ORDER_ACCEPT_FAIL,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/sellerConstants";

/**
 * Seller Actions related function to establish connection with server/API
 */

export const register =
  (email, password, mobileNum, filename, name, type, storeAddress) =>
  async (dispatch) => {
    try {
      dispatch({ type: SELLER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/sellers/register",
        { email, password, mobileNum, filename, name, type, storeAddress },
        config
      );

      dispatch({
        type: SELLER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: SELLER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("sellerInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SELLER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SELLER_LOGIN_REQUEST,
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/sellers/login",
      { email, password },
      config
    );

    localStorage.setItem("sellerInfo", JSON.stringify(data));

    dispatch({
      type: SELLER_LOGIN_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("sellerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SELLER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const logout = () => (dispatch, getState) => {
  localStorage.removeItem("sellerInfo");
  //getState().userDetails.user = {};
  //localStorage.removeItem("shippingAddress");
  dispatch({ type: SELLER_LOGOUT });
};

export const addProduct =
  (
    title,
    price,
    discountedPrice,
    description,
    type,
    subType,
    filename,
    countInStock,
    sellerId
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SELLER_ADD_PRODUCT_REQUEST });

      let {
        sellerLogin: { sellerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sellerInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/sellers/${sellerId}/products/new`,
        {
          title,
          price,
          discountedPrice,
          description,
          type,
          subType,
          filename,
          countInStock,
        },
        config
      );

      localStorage.setItem("sellerInfo", JSON.stringify(data));

      dispatch({
        type: SELLER_ADD_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SELLER_ADD_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const getCategoricalProducts =
  (sellerId, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: SELLER_PRODUCT_FILTER_REQUEST });

      let {
        sellerLogin: { sellerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sellerInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/sellers/${sellerId}/products/${category}`,
        config
      );

      //localStorage.setItem("sellerInfo", JSON.stringify(data));

      dispatch({
        type: SELLER_PRODUCT_FILTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SELLER_PRODUCT_FILTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const getSellerOrders = (sellerId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELLER_GET_ORDERS_REQUEST });

    let {
      sellerLogin: { sellerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sellerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/sellers/${sellerId}/orders`, config);

    dispatch({
      type: SELLER_GET_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const acceptOrder =
  (sellerId, orderId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_ACCEPT_REQUEST,
      });

      let {
        sellerLogin: { sellerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sellerInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/sellers/${sellerId}/orders/${orderId}/accept`,
        { orderId },
        config
      );

      dispatch({
        type: ORDER_ACCEPT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_ACCEPT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const shipOrder = (sellerId, orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_SHIP_REQUEST,
    });

    let {
      sellerLogin: { sellerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sellerInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/sellers/${sellerId}/orders/${orderId}/ship`,
      { orderId },
      config
    );

    dispatch({
      type: ORDER_SHIP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_SHIP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deliverOrder =
  (sellerId, orderId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      });

      let {
        sellerLogin: { sellerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sellerInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/sellers/${sellerId}/orders/${orderId}/deliver`,
        { orderId },
        config
      );

      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
