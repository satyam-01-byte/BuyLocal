import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
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
  ORDER_PAY_RESET,
  ORDER_ALL_MY_FAIL,
  ORDER_ALL_MY_REQUEST,
  ORDER_ALL_MY_SUCCESS,
} from "../constants/orderConstants";

//order action reducer
//checks status of the action that is performed on the order

export const createRazorpayOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case RAZORPAY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case RAZORPAY_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        razorpayOrder: action.payload[0],
        orderInfo: action.payload[1],
      };
    case RAZORPAY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const verifyPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_PAYMENT_REQUEST:
      return {
        loading: true,
      };
    case VERIFY_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      };
    case VERIFY_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ordersAllMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_ALL_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_ALL_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
