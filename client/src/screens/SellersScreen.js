import React from "react";
import { Link } from "react-router-dom";
import "./styles/Seller.css";

//seller portal home page

const SellersScreen = () => {
  return (
    <div className="sellersPage">
      <div className="header">
        <h2 className="sellerLogo">
          <Link to="/sellers">ShopLocal</Link>
        </h2>

        <div className="navLinks">
          <Link to="/sellers/login">Sign-in</Link>
          <Link to="/sellers/register" className="altLink">
            Start Selling
          </Link>
        </div>
      </div>
      <div className="pageCenter fccc">
        <img
          src="/images/stock-market.png"
          alt="growth"
          height="200"
          width="200"
        />
        <h2>Start selling in 3 steps:</h2>
        <h3>1. Create your seller account</h3>
        <h3>2. Add your business details</h3>
        <h3>3. Add your products</h3>
        <Link to="/sellers/register" className="altLink">
          Start Selling
        </Link>
      </div>
    </div>
  );
};

export default SellersScreen;
