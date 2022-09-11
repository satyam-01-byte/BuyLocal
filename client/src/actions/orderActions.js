import axios from "axios";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDER_ALL_MY_FAIL,
  ORDER_ALL_MY_REQUEST,
  ORDER_ALL_MY_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  RAZORPAY_ORDER_FAIL,
  RAZORPAY_ORDER_REQUEST,
  RAZORPAY_ORDER_SUCCESS,
  VERIFY_PAYMENT_FAIL,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from "../constants/orderConstants";

/**
 * Order related function to establish connection with server/API
 */

const __DEV__ = document.domain === "localhost";

export const RazorpayOrderCreate =
  (orderInfo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RAZORPAY_ORDER_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // };

      const url = __DEV__
        ? "http://localhost:5000/api/orders/pay"
        : "https://locerappdemo.herokuapp.com/api/orders/pay";

      const amount = { totalPrice: Math.round(orderInfo.totalPrice) };

      const { data } = await axios.post(url, amount);
      dispatch({
        type: RAZORPAY_ORDER_SUCCESS,
        payload: [data, orderInfo],
      });
    } catch (error) {
      dispatch({
        type: RAZORPAY_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const paymentVerification =
  (paymentInfo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: VERIFY_PAYMENT_REQUEST,
      });

      const url = __DEV__
        ? "http://localhost:5000/api/orders/verifypay"
        : "https://locerappdemo.herokuapp.com/api/orders/verifypay";

      const data = await axios.post(url, paymentInfo);
      dispatch({
        type: VERIFY_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: VERIFY_PAYMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const orderCreate = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getAllMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_ALL_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/allmy`, config);

    dispatch({
      type: ORDER_ALL_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ALL_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
