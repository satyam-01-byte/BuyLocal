import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import {
  getSellerOrders,
  acceptOrder,
  shipOrder,
  deliverOrder,
} from "../actions/sellerActions";

const SellerOrderDetailsScreen = ({ match, history }) => {
  const sellerGetOrders = useSelector((state) => state.sellerGetOrders);
  const { loading, error, orders } = sellerGetOrders;

  const sellerInfo = JSON.parse(localStorage.getItem("sellerInfo"));
  const sellerId = sellerInfo._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerOrders(sellerId));
  }, [dispatch, sellerId]);

  let matchingOrder;
  if (!loading && orders) {
    matchingOrder = orders.filter((o) => o._id === match.params.orderId);
  }

  const acceptOrderHandler = (orderId) => {
    dispatch(acceptOrder(sellerId, orderId));
    setTimeout(() => {
      history.go(0);
    }, 500);
  };

  const shipOrderHandler = (orderId) => {
    dispatch(shipOrder(sellerId, orderId));
    setTimeout(() => {
      history.go(0);
    }, 500);
  };

  const deliverOrderHandler = (orderId) => {
    dispatch(deliverOrder(sellerId, orderId));
    setTimeout(() => {
      history.go(0);
    }, 500);
  };

  return (
    <div className="placeorderBuffer">
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="placeorderPage" style={{ marginTop: "10px" }}>
          {matchingOrder &&
            matchingOrder.map((order) => {
              return (
                <div key={order._id}>
                  <h2 id="orderId">Order #{order._id}</h2>
                  <div
                    className="placeorderScreen"
                    style={{ marginTop: "10px" }}
                  >
                    <div id="section1" style={{ width: "99vw" }}>
                      <div className="userInfo">
                        <p>
                          <strong>Customer Mobile Number: </strong>
                          {order.userMobileNum}
                        </p>
                        {/* <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p> */}
                      </div>
                      <div className="shippingAddress">
                        <h2>Shipping Address</h2>
                        <p>
                          {order.shippingAddress.address},{" "}
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state},{" "}
                          {order.shippingAddress.postalCode},{" "}
                          {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                          <h3 style={{ color: "green" }}>Delivered</h3>
                        ) : (
                          <h3 style={{ color: "red" }}>Not delivered</h3>
                        )}
                      </div>

                      <div className="paymentMethod">
                        <h2>Payment Method</h2>
                        <p>{order.paymentMethod}</p>
                        {order.isPaid ? (
                          <h3 style={{ color: "green" }}>Paid</h3>
                        ) : (
                          <h3 style={{ color: "red" }}>Not paid</h3>
                        )}
                      </div>

                      <div className="cartItems">
                        <h2>Items</h2>
                        {order.orderItems.map((item, index) => (
                          <div className="item" key={index}>
                            <Link
                              className="image"
                              style={{ borderRadius: "0%" }}
                              to={`/stores/${item.storeId}/products/${item.id}`}
                            >
                              <img
                                src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${item.filename}`}
                                //src={`/images/products/${item.filename}`}
                                alt={item.title}
                              />
                            </Link>
                            <div className="info">
                              <h3>
                                <Link
                                  to={`/stores/${item.storeId}/products/${item.id}`}
                                >
                                  {item.title}
                                </Link>
                              </h3>
                              <p>
                                {item.qty} x Rs. {item.price} = Rs.{" "}
                                {(item.qty * item.price).toFixed(2)}
                              </p>
                              {/* <Link to={`/stores/${item.storeId}/products`}>
                                {item.storeName}
                              </Link> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div id="section2">
                      <h2>Payment Info</h2>
                      <div className="costInfo">
                        <h3>Items total:</h3>
                        <p>Rs. {order.itemsPrice}</p>
                      </div>
                      <div className="costInfo">
                        <h3>Shipping cost:</h3> <p>Rs. {order.shippingPrice}</p>
                      </div>
                      <div className="costInfo">
                        <h3>Taxes: </h3>
                        <p>Rs. {order.taxPrice}</p>
                      </div>
                      <div className="costInfo">
                        <h3>Total cost:</h3>
                        <p>Rs. {order.totalPrice}</p>
                      </div>
                      {!order.isAccepted && (
                        <button
                          type="button"
                          className="formBtn"
                          onClick={() => acceptOrderHandler(order._id)}
                        >
                          Accept Order
                        </button>
                      )}
                      {order.isAccepted && !order.isShipped && (
                        <button
                          type="button"
                          className="formBtn"
                          onClick={() => shipOrderHandler(order._id)}
                        >
                          Ship order
                        </button>
                      )}
                      {order.isShipped && !order.isDelivered && (
                        <button
                          type="button"
                          className="formBtn"
                          onClick={() => deliverOrderHandler(order._id)}
                        >
                          Order delivered
                        </button>
                      )}
                      {order.isDelivered && <p>Order complete!</p>}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SellerOrderDetailsScreen;
