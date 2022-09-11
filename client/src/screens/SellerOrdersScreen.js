import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../actions/sellerActions";
import PreContentAnimation from "../components/PreContentAnimation";

//orders associated with a seller

const SellerOrdersScreen = ({ history }) => {
  const sellerGetOrders = useSelector((state) => state.sellerGetOrders);
  const { loading, error, orders } = sellerGetOrders;

  const sellerInfo = JSON.parse(localStorage.getItem("sellerInfo"));
  const sellerId = sellerInfo._id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerOrders(sellerId));
  }, [dispatch, sellerId]);

  const showOrderDetails = (id) => {
    history.push(`/sellers/${sellerId}/orders/${id}`);
  };

  return (
    <>
      {loading ? (
        <PreContentAnimation />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="itemList">
          {orders &&
            orders.map((order) => {
              return (
                <div
                  key={order._id}
                  className="item"
                  style={{ margin: "15px 30px" }}
                  onClick={() => showOrderDetails(order._id)}
                >
                  <div className="image" style={{ borderRadius: "0%" }}>
                    <img
                      src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${order.orderItems[0].filename}`}
                      alt="order-pic"
                    />
                  </div>
                  <div className="info">
                    <h5 style={{ textAlign: "center" }}>Order #{order._id}</h5>
                    <div className="sellerOrderPaymentInfo">
                      {order.paymentResult ? (
                        <p style={{ color: "green" }}>
                          {order.paymentResult.status.charAt(0).toUpperCase() +
                            order.paymentResult.status.slice(1)}
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>Unpaid</p>
                      )}

                      <p style={{ color: "black" }}>Rs. {order.totalPrice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SellerOrdersScreen;
