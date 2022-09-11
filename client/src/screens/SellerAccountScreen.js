import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/sellerActions";

//seller detials

const SellerAccountScreen = () => {
  const sellerInfo = JSON.parse(localStorage.getItem("sellerInfo"));
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/sellers");
  };

  return (
    <div className="productSection">
      <button className="btn btn-secondary" onClick={logoutHandler}>
        Logout
      </button>
      <p>Email: {sellerInfo.email}</p>
      <p>Store id: {sellerInfo._id}</p>
      <p>Mobile Number: {sellerInfo.mobileNum}</p>
    </div>
  );
};

export default SellerAccountScreen;
