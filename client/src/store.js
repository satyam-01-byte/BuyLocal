import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { storeListReducer } from "./reducers/storeReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  createRazorpayOrderReducer,
  createOrderReducer,
  orderDetailsReducer,
  ordersAllMyReducer,
  verifyPaymentReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import {
  sellerLoginReducer,
  sellerRegisterReducer,
  sellerAddProductReducer,
  sellerProductFilterReducer,
  sellerGetOrdersReducer,
  sellerAcceptOrderReducer,
  sellerShipOrderReducer,
  sellerDeliverOrderReducer,
} from "./reducers/sellerReducers";

const reducer = combineReducers({
  productList: productListReducer,
  storeList: storeListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  createRazorpayOrder: createRazorpayOrderReducer,
  verifyPayment: verifyPaymentReducer,
  orderPay: orderPayReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  ordersAllMy: ordersAllMyReducer,
  sellerLogin: sellerLoginReducer,
  sellerRegister: sellerRegisterReducer,
  sellerAddProduct: sellerAddProductReducer,
  sellerProductFilter: sellerProductFilterReducer,
  sellerGetOrders: sellerGetOrdersReducer,
  acceptOrder: sellerAcceptOrderReducer,
  shipOrder: sellerShipOrderReducer,
  deliverOrder: sellerDeliverOrderReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const sellerInfoFromStorage = localStorage.getItem("sellerInfo")
  ? JSON.parse(localStorage.getItem("sellerInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  sellerLogin: {
    sellerInfo: sellerInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
