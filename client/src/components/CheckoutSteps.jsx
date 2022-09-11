import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * CHeckout steps
 */

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="checkoutSteps">
      {!userInfo &&
        (step1 ? (
          //SIgn up if doesn't have an account
          <Link to="/login" style={{ color: "#000" }}>
            Sign Up
          </Link>
        ) : (
          <Link to="#" style={{ color: "grey", cursor: "not-allowed" }}>
            Sign Up
          </Link>
        ))}

      {step2 ? (
        //shipping details
        <Link to="/shipping" style={{ color: "#000" }}>
          Shipping
        </Link>
      ) : (
        <Link to="#" style={{ color: "grey", cursor: "not-allowed" }}>
          Shipping
        </Link>
      )}

      {step3 ? (
        //payment options
        <Link to="/payment" style={{ color: "#000" }}>
          Payment
        </Link>
      ) : (
        <Link to="#" style={{ color: "grey", cursor: "not-allowed" }}>
          Payment
        </Link>
      )}

      {step4 ? (
        //order conformation
        <Link to="/placeorder" style={{ color: "#000" }}>
          Place Order
        </Link>
      ) : (
        <Link to="#" style={{ color: "grey", cursor: "not-allowed" }}>
          Place Order
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
