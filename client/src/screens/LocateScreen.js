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
    if (location === "841301" || location === "711101" || location === "711103" || location === "711106") {
      ele.style.display = "none";
      localStorage.setItem("userLocation", JSON.stringify(location));
      history.push(`/stores/location/${location}`);
    } else {
      ele.style.display = "block";
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
            src="images/LOGO-removebg-preview.png"
            alt="LOCER"
            width={150}
            style={{ cursor: "pointer" }}
          />
          {/* <h3>Your local marketplace + delivery</h3> */}
        </div>

        {!userInfo && (
          <Link to="/login" className="loginLink">
            Log In
          </Link>
        )}
      </div>

      {/* <div
        style={{
          width: "100vw",
          margin: "40px 0",
          display: "flex",
          justifyContent: "center",
          padding: "30px 0",
        }}
      >
        <img
          src="https://res.cloudinary.com/locer/image/upload/v1636008288/locer/posters/poster1.png"
          alt="sale1"
          width="80%"
          height="150px"
          style={{ maxWidth: "600px", minWidth: "350px" }}
        />
      </div> */}

      <div
        className="container-fluid mt-5 p-5"
        style={{
          background:
            "url('https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80') no-repeat center",
          // padding: "80px 0",
        }}
      >
        {/* <img src="/images/growth.png" alt="growth" width="400" height="200" /> */}
        <form onSubmit={submitHandler} className="locateForm fccc">
          <h2>Order groceries for delivery</h2>
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
              <br /> We are currently operating at: Chhapra, Bihar (841301)
              <br />
              Hopefully we will see you soon!
            </p>
          </div>
        </form>

        <div className="locateScreenFormLink">
          <span className="formLink">
            Wish to sell on our plaform?{" "}
            <a
              target="_blank"
              href="https://forms.gle/C52yuwhvBn1V958U9"
              rel="noreferrer"
            >
              Let's Talk
            </a>
          </span>
        </div>
      </div>
      {/* <div className="locateScreenFormLink">
        <span className="formLink">
          Wish to sell on our plaform?{" "}
          <a
            target="_blank"
            href="https://forms.gle/C52yuwhvBn1V958U9"
            rel="noreferrer"
          >
            Let's Talk
          </a>
        </span>
      </div> */}

      <div className="container mt-5">
        <h4>Grocery delivery you can count on</h4>
        <div className="d-flex flex-row justify-content-center flex-wrap mt-4">
          <div>
            <h2>
              <b>Choose what you want</b>
            </h2>
            <p>
              Select items from your favorite grocery stores at Locer.in or in
              the app.
            </p>
          </div>
          <div>
            <h2>
              <b>See real-time updates</b>
            </h2>
            <p>Chat as we manage your order.</p>
          </div>
          <div>
            <h2>
              <b>Get your items same-day</b>
            </h2>
            <p>
              Pick a convenient time for you. Enjoy Locer's 100% quality
              guarantee on every order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocateScreen;
