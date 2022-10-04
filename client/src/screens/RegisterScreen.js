import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import Loader from "../components/Loader";
import {
  togglePassword,
  toggleConfirmPassword,
  checkPasswordStrength,
} from "../components/PasswordFunctions";
import "./styles/RegisterScreen.css";

//user registration

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNum, setMobileNum] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo || userLogin.userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo, userLogin]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Passwords do not match!");
    else dispatch(register(name, email, password, mobileNum));
  };

  return (
    <div className="fccc">
      <h1 className="signUpHeading">Sign Up</h1>
      {error && <h3>{error}</h3>}
      {message && <h3>{message}</h3>}
      {loading && <Loader />}
      <form onSubmit={submitHandler} className="typeForm fcdd">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email address: </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="mobileNum">Mobile Number: </label>
        <input
          type="number"
          id="mobileNum"
          placeholder="Enter your mobile number"
          value={mobileNum}
          onChange={(e) => setMobileNum(e.target.value)}
          // onKeyUp={(e) => checkPasswordStrength(e.target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Enter a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => checkPasswordStrength(e.target.value)}
          required
        />
        <i
          className="fas fa-eye-slash"
          id="pwbtn"
          onClick={() => togglePassword()}
        ></i>
        <div id="strengthBar"></div>

        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter your password again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <i
          className="fas fa-eye-slash"
          id="cpwbtn"
          onClick={() => toggleConfirmPassword()}
        ></i>

        <button type="submit" className="formBtn">
          Register
        </button>
      </form>
      <p>or,</p>

      <h3 style={{ textAlign: "center" }} className="signUpFormRedirect">
        Already have an account?{" "}
        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
          Log-in
        </Link>
      </h3>
    </div>
  );
};

export default RegisterScreen;
