import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/LocateScreen.css";

const LocateScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [location, setLocation] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    var ele = document.getElementsByClassName("alertOperation")[0];
    if (
      location === "847211" ||
      location === "734103" ||
      location === "324005"
    ) {
      ele.style.display = "none";
      localStorage.setItem("userLocation", JSON.stringify(location));
      history.push(`/stores/location/${location}`);
    } else {
      ele.style.display = "block";
      setTimeout(() => {
        ele.style.display = "none";
      }, 5000);
    }
  };

  useEffect(() => {
    const userLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (userLocation)
      history.push(`/stores/location/${parseInt(userLocation)}`);
  }, [history]);

  return (
    <div className="locateScreen text-center">
      <div className="locateScreenHeader">
        <div className="locateScreenLogoTagline fccc">
          <img
            src="images/logo.png"
            alt="Logo"
            width={150}
            style={{ cursor: "pointer" }}
          />
        </div>

        {!userInfo && (
          <Link to="/login" className="loginLink">
            Log In
          </Link>
        )}
      </div>

      <div className="container-fluid mt-5 p-5">
        <form onSubmit={submitHandler} className="locateForm fccc">
          <h2 id="changingText">Order anything for delivery</h2>
          <p>
            Whatever you want from local stores, brought right to your door.
          </p>
          <div className="searchBar frcc">
            <label htmlFor="location">
              <i className="fa fa-map-marker"></i>
            </label>
            <input
              type="search"
              name="location"
              id="location"
              placeholder="Enter pincode"
              required={true}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit" className="locationSubmitButton">
            Continue
          </button>
          <br />
          <div className="alertOperation mt-4" style={{ display: "none" }}>
            <p style={{ fontSize: "large" }}>
              We regret to inform you that we are not yet operating at your
              location.
              <br />
              Hopefully we will see you soon!
            </p>
          </div>
        </form>

        <div className="locateScreenFormLink">
          Are you a seller? Visit ShopLocal for{" "}
          <Link to={"/sellers"}>sellers</Link>
        </div>
      </div>

      <div className="container mt-5">
        <h4>Delivery you can count on</h4>
        <div className="d-flex flex-row justify-content-center flex-wrap mt-4">
          <div className="m-4">
            <h2>
              <b>Choose what you want</b>
            </h2>
            <p>Select items from your favorite stores.</p>
          </div>
          <div className="m-4">
            <h2>
              <b>See real-time updates</b>
            </h2>
            <p>Chat as we manage your order.</p>
          </div>
          <div className="m-4">
            <h2>
              <b>Get your items same-day</b>
            </h2>
            <p>
              Pick a convenient time for you. Enjoy ShopLocal's 100% quality
              guarantee on every order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocateScreen;
