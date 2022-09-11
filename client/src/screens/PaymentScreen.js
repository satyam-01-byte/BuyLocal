import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import "./styles/PaymentScreen.css";

//asks if pay now or COD

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  if (cart.cartItems.length === 0) history.push("/login");
  const { shippingAddress } = cart;
  if (shippingAddress.length === 0) history.push("/shipping");
  const userLogin = useSelector((state) => state.userLogin);

  if (!userLogin.userInfo) history.push("/login");

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <div className="fccc payment">
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <p>Select your payment method: </p>
      <form onSubmit={submitHandler} className="fccc">
        <div>
          <label htmlFor="COD">UPI/Cash on Delivery</label>
          <input
            type="radio"
            id="COD"
            name="paymentMethod"
            value="UPI/Cash on Delivery"
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="formBtn">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
