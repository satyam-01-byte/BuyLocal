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
  SELLER_GET_ORDER_DETAILS_FAIL,
  SELLER_GET_ORDER_DETAILS_REQUEST,
  SELLER_GET_ORDER_DETAILS_SUCCESS,
  ORDER_ACCEPT_FAIL,
  ORDER_ACCEPT_REQUEST,
  ORDER_ACCEPT_SUCCESS,
  ORDER_SHIP_REQUEST,
  ORDER_SHIP_SUCCESS,
  ORDER_SHIP_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/sellerConstants";

//seller action reducer
//checks status of the action that is performed on the seller

export const sellerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_LOGIN_REQUEST:
      return { loading: true };
    case SELLER_LOGIN_SUCCESS:
      return { loading: false, sellerInfo: action.payload };
    case SELLER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case SELLER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const sellerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_REGISTER_REQUEST:
      return { loading: true };
    case SELLER_REGISTER_SUCCESS:
      return { loading: false, sellerInfo: action.payload };
    case SELLER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerAddProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_ADD_PRODUCT_REQUEST:
      return { loading: true };
    case SELLER_ADD_PRODUCT_SUCCESS:
      return { loading: false, success: true, sellerInfo: action.payload };
    case SELLER_ADD_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerProductFilterReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_PRODUCT_FILTER_REQUEST:
      return { loading: true };
    case SELLER_PRODUCT_FILTER_SUCCESS:
      return { loading: false, success: true, products: action.payload };
    case SELLER_PRODUCT_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerGetOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_GET_ORDERS_REQUEST:
      return { loading: true };
    case SELLER_GET_ORDERS_SUCCESS:
      return { loading: false, orders: action.payload };
    case SELLER_GET_ORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerGetOrderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_GET_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case SELLER_GET_ORDER_DETAILS_SUCCESS:
      return { loading: false, orderDetails: action.payload };
    case SELLER_GET_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerAcceptOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ACCEPT_REQUEST:
      return { loading: true };
    case ORDER_ACCEPT_SUCCESS:
      return { loading: false, orderDetails: action.payload };
    case ORDER_ACCEPT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerShipOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SHIP_REQUEST:
      return { loading: true };
    case ORDER_SHIP_SUCCESS:
      return { loading: false, orderDetails: action.payload };
    case ORDER_SHIP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerDeliverOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, orderDetails: action.payload };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
