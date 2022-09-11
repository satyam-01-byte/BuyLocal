import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import "./styles/OrdersScreen.css";
// import { clearCartItems } from "../actions/cartActions";

/**
 * shows order details and status after an order is placed
 */

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  // const orderPay = useSelector((state) => state.orderPay);

  useEffect(() => {
    //if (orderPay.success) dispatch(getOrderDetails(orderPay.order._id));
    if (!order || order._id !== orderId) dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, order]);

  // const confirmOrderHandler = () => {
  //   dispatch(clearCartItems());
  //   history.push("/profile");
  // };

  return (
    <div className="placeorderBuffer">
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="placeorderPage">
          <h2 id="orderId">Order {order._id}</h2>
          <div className="placeorderScreen">
            <div id="section1" style={{ maxWidth: "99vw" }}>
              <div className="userInfo">
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Phone No: </strong>
                  {order.user.mobileNum}
                </p>
              </div>
              <div className="shippingAddress">
                <h2>Shipping Address</h2>
                <p>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state},{" "}
                  {order.shippingAddress.postalCode},{" "}
                </p>
                {!order.isAccepted ? (
                  <h3
                    style={{
                      border: "2px dashed red",
                      padding: "3px",
                      marginTop: "0px",
                    }}
                  >
                    Confirming order...
                  </h3>
                ) : (
                  <h3
                    style={{
                      border: "2px dashed green",
                      padding: "3px",
                      marginTop: "0px",
                    }}
                  >
                    Order accepted
                  </h3>
                )}
                {order.isAccepted && !order.isShipped && (
                  <h3
                    style={{
                      border: "2px dashed red",
                      padding: "3px",
                      marginTop: "0px",
                    }}
                  >
                    Preparing order...
                  </h3>
                )}
                {order.isAccepted && order.isShipped && (
                  <h3
                    style={{
                      border: "2px dashed green",
                      padding: "3px",
                      marginTop: "0px",
                    }}
                  >
                    Out for delivery
                  </h3>
                )}
                {order.isDelivered && (
                  <h3
                    style={{
                      border: "2px dashed green",
                      padding: "3px",
                      marginTop: "0px",
                    }}
                  >
                    Order delivered
                  </h3>
                )}
              </div>

              <div className="paymentMethod">
                <h2>Payment Method</h2>
                <p>{order.paymentMethod}</p>
                {order.isPaid ? (
                  <h3
                    style={{
                      border: "2px dashed green",
                      padding: "3px",
                      marginTop: "0px",
                    }}
                  >
                    Paid
                  </h3>
                ) : (
                  <h3
                    style={{
                      border: "2px dashed red",
                      padding: "3px",
                      marginTop: "0px",
                    }}
                  >
                    Not paid
                  </h3>
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
              {/* <button
                type="submit"
                className="submitBtn"
                onClick={confirmOrderHandler}
                disabled={order.orderItems.length === 0}
                style={{ marginTop: "20px" }}
              >
                Pay Now
              </button> */}{" "}
              {/*Pay Now*/}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
