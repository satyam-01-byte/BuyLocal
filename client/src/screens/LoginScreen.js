import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { login } from "../actions/userActions.js";
import { togglePassword } from "../components/PasswordFunctions";
import "./styles/LoginScreen.css";

/**
 * customer login page
 */

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);

  const userLocation = JSON.parse(localStorage.getItem("userLocation"));

  const redirect = location.search
    ? location.search.split("=")[1]
    : `/stores/location/${userLocation}`;

  useEffect(() => {
    if (userInfo || userRegister.userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, userRegister]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="fccc">
      <h1 className="loginHeading">Login</h1>
      {error && <h3>{error}</h3>}
      {loading && <Loader />}
      <form onSubmit={submitHandler} className="typeForm fcdd">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className="fas fa-eye-slash"
          id="pwbtn"
          onClick={() => togglePassword()}
        ></i>
        <button type="submit" className="formBtn">
          Login
        </button>
      </form>
      <p>or,</p>

      <h3 className="registerRedirectLoginPage">
        New user?{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register
        </Link>
      </h3>
    </div>
  );
};

export default LoginScreen;
