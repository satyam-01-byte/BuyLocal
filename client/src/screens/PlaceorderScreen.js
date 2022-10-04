import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderCreate } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { clearCartItems } from "../actions/cartActions";
import Loader from "../components/Loader";
import { listStores } from "../actions/storeActions";
import "./styles/PlaceOrderScreen.css";

//either placeorder with COD or head to razorpay

const PlaceorderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  if (!shippingAddress) history.push("/shipping");
  else if (!paymentMethod) history.push("/payment");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userLocation = JSON.parse(localStorage.getItem("userLocation"));

  useEffect(() => {
    dispatch(listStores(userLocation));
  }, [dispatch, userLocation]);

  cart.itemsPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  let savings = cartItems
    .reduce((acc, item) => acc + item.qty * (item.price - item.price), 0)
    .toFixed(2);
  cart.shippingPrice = (25).toFixed(2);
  cart.discount =
    Number(cart.itemsPrice) > 500
      ? Number(cart.itemsPrice) > 1000
        ? 100
        : 50
      : 10;
  cart.taxPrice = 0;
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) -
    Number(cart.discount)
  ).toFixed(2);

  const orderInfo = {
    user: userInfo,
    userMobileNum: userInfo.mobileNum,
    orderItems: cartItems,
    shippingAddress: shippingAddress,
    paymentMethod: paymentMethod,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
  };

  const placeorderHandler = () => {
    dispatch(orderCreate(orderInfo)) && dispatch(clearCartItems());
  };

  const createOrder = useSelector((state) => state.createOrder);
  const { loading, order, success } = createOrder;

  useEffect(() => {
    if (success) history.push(`/orders/${order._id}`);
  }, [history, success, order]);

  return (
    <div className="placeorderBuffer">
      {loading ? (
        <Loader />
      ) : (
        <div className="placeorderPage">
          <CheckoutSteps step1 step2 step3 step4 />
          <h1>Order details</h1>
          <div className="placeorderScreen mt-3">
            <div id="section1" style={{ maxWidth: "99vw" }}>
              <div className="shippingAddress">
                <h2>Shipping Address</h2>
                <p>
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.state}, {shippingAddress.postalCode}{" "}
                </p>
                <h5>
                  <i className="fa-solid fa-phone"></i> {userInfo.mobileNum}
                </h5>
              </div>

              <div className="paymentMethod mt-2">
                <h2>Payment Method</h2>
                <p>{paymentMethod}</p>
              </div>

              <div className="cartItems">
                <h2>Items</h2>
                {cartItems.map((item, index) => (
                  <div
                    className="item"
                    style={{ height: "18rem", width: "22rem" }}
                    key={index}
                  >
                    <Link to={`/stores/${item.storeId}/products/${item.id}`}>
                      <img
                        src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${item.filename}`}
                        alt={item.title}
                      />
                    </Link>
                    <div className="info">
                      <h5>
                        <Link
                          to={`/stores/${item.storeId}/products/${item.id}`}
                        >
                          {item.title}
                        </Link>
                      </h5>
                      <p>
                        {item.qty} x Rs. {item.price} = Rs.{" "}
                        {(item.qty * item.price).toFixed(2)}
                      </p>
                      <Link to={`/stores/${item.storeId}/products`}>
                        {item.storeName}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="section2">
              <h2>Payment Info</h2>
              <div className="costInfo">
                <h3>Items total:</h3>
                <p>Rs. {cart.itemsPrice}</p>
              </div>
              <div className="costInfo">
                <h3>Shipping cost:</h3> <p>Rs. {cart.shippingPrice}</p>
              </div>
              <div className="costInfo">
                <h3>Discount: </h3>
                <p>Rs. {cart.discount}</p>
              </div>
              <div className="costInfo">
                <h3>Total cost:</h3>
                <p>Rs. {cart.totalPrice}</p>
              </div>
              <p className="alert alert-success">
                You saved Rs. {parseInt(savings) + cart.discount}!
              </p>
              <button
                type="button"
                className="formBtn"
                onClick={placeorderHandler}
              >
                {paymentMethod === "UPI/Cash on Delivery"
                  ? "Place Order"
                  : "Continue to Pay"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceorderScreen;
