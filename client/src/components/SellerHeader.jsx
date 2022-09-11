import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROOT } from "../constants/cssConstants";

/**
 * seller header 
 * detilas such as name and stuff
 */

const SellerHeader = () => {
  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { sellerInfo } = sellerLogin;

  useEffect(() => {
    const url = window.location.href;
    const sellerNavLinks = document.getElementsByClassName("sellerNavLinks");
    const snls = Array.from(sellerNavLinks);
    snls.map((snl) => {
      snl.href === url
        ? (snl.style.color = `${ROOT.color3}`)
        : (snl.style.color = `${ROOT.textColor}`);
      return {};
    });
  });

  return (
    <>
      {sellerInfo && (
        <div className="sellerHeader" style={{zIndex:"1000", width:"100vw"}}>
          <div className="storeDetails">
            <div className="storeImage">
              <img
                // src={`/images/logos/${sellerInfo.filename}`}
                src={`https://res.cloudinary.com/locer/image/upload/v1629552685/locer/logos/${sellerInfo.filename}`}
                alt="store-logo"
                width="150px"
              />
            </div>
            <div className="storeInfo">
              <h3>
                {sellerInfo.name} ({sellerInfo.type})
              </h3>
              <h4>{sellerInfo.storeAddress.address}</h4>
            </div>
          </div>
          <div className="storeLinks">
            <Link
              to={`/sellers/${sellerInfo._id}/products`}
              className="sellerNavLinks"
            >
              Products
            </Link>
            <Link
              to={`/sellers/${sellerInfo._id}/orders`}
              className="sellerNavLinks"
            >
              Orders
            </Link>
            <Link
              to={`/sellers/${sellerInfo._id}/sales`}
              className="sellerNavLinks"
            >
              Sales
            </Link>
            <Link
              to={`/sellers/${sellerInfo._id}/account`}
              className="sellerNavLinks"
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerHeader;
