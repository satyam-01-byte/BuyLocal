import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import {
  orderCreate,
  payOrder,
  paymentVerification,
} from "../actions/orderActions";
import { clearCartItems } from "../actions/cartActions";

const RazorpayScreen = ({ history }) => {
  // useEffect(() => {
  //   displayRazorpay();
  // }, [displayRazorpay]);

  const dispatch = useDispatch();
  const createRazorpayOrder = useSelector((state) => state.createRazorpayOrder);
  const { loading, razorpayOrder, orderInfo, error } = createRazorpayOrder;

  const userLogin = useSelector((state) => state.userLogin);
  const { name, email } = userLogin.userInfo;

  const [paymentId, setPaymentId] = useState("1");
  const [data, setData] = useState({});

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  //const __DEV__ = document.domain === "localhost";

  // const [name, setName] = useState("Adam");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      //key: __DEV__ ? process.env.REACT_APP_RZRPAY_KEY_ID : "PRODUCTION_KEY",
      key: process.env.REACT_APP_RZRPAY_KEY_ID,
      currency: razorpayOrder.currency,
      amount: razorpayOrder.amount.toString(),
      order_id: razorpayOrder.id,
      name: "Order payment",
      description: "Total Amount:",
      //image: 'http://localhost:1337/logo.svg',
      handler: function (response) {
        // setPaymentId(response.razorpay_payment_id);
        const razorpayData = {
          orderCreationId: razorpayOrder.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        setData(razorpayData);
        setPaymentId(razorpayData.razorpayPaymentId);
        // const result = await axios.post(
        //   "http://localhost:5000/api/orders/verifypay",
        //   data
        // );
        // if(data) dispatch(paymentVerification(data));
        // if (result.data.msg === "payment verified") {
        //   dispatch(orderCreate(orderInfo)) && dispatch(clearCartItems());
        // }
      },
      prefill: {
        name: name,
        email: email,
        contact: "9876543210",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const verifyPayment = useSelector((state) => state.verifyPayment);

  useEffect(() => {
    if (createRazorpayOrder.success && data && Object.keys(data).length)
      dispatch(paymentVerification(data));
  }, [dispatch, data, createRazorpayOrder]);

  useEffect(() => {
    if (
      verifyPayment.result &&
      verifyPayment.result.data.msg === "payment verified"
    )
      dispatch(orderCreate(orderInfo)) && dispatch(clearCartItems());
  }, [dispatch, orderInfo, verifyPayment.result]);

  const createOrder = useSelector((state) => state.createOrder);
  const { order, success } = createOrder;

  useEffect(() => {
    if (success) {
      const paymentResult = {
        id: paymentId,
        status: "paid",
        update_time: Date.now(),
        payer: {
          email_address: email,
        },
      };
      dispatch(payOrder(order._id, paymentResult));
      setTimeout(() => {
        history.push(`/orders/${order._id}`);
      }, 1000);
    }
  }, [history, success, order, dispatch, email, paymentId]);

  return (
    <div>
      {loading || createOrder.loading || verifyPayment.loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div>
          <button className="altLink" onClick={() => displayRazorpay()}>
            Pay on Razorpay
          </button>
        </div>
      )}
    </div>
  );
};

export default RazorpayScreen;
