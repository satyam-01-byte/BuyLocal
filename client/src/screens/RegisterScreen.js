import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register, login } from "../actions/userActions";
import Loader from "../components/Loader";
import {
  togglePassword,
  toggleConfirmPassword,
  checkPasswordStrength,
} from "../components/PasswordFunctions";
import GoogleLogin from "react-google-login";
import "./styles/RegisterScreen.css";

//user registration

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNum, setMobileNum] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [google, setGoogle] = useState(0);

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

  // const googleSignUp = (e) => {
  //   if (e && e.profileObj) {
  //     const { googleId, email, name } = e.profileObj;
  //     setName(name);
  //     setEmail(email);
  //     setPassword(googleId);
  //     setConfirmPassword(googleId);
  //     setMobileNum(mobileNum);
  //     setGoogle(1);
  //     dispatch(register(name, email, googleId, mobileNum));
  //   }
  // };

  // useEffect(() => {
  //   if (google === 1 && error)
  //     setTimeout(() => {
  //       dispatch(login(email, password));
  //     }, 1000);
  // }, [google, error, dispatch, email, password]);

  return (
    <div className="fccc">
      <h1 className="signUpHeading">Sign Up</h1>
      {error && !google && <h3>{error}</h3>}
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
      {/* <GoogleLogin
        onSuccess={googleSignUp}
        onFailure={googleSignUp}
        render={(renderProps) => (
          <button
            className="formBtn"
            // style={{ padding: "10px 80px" }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign up with <i className="fab fa-google"></i>{" "}
          </button>
        )}
        cookiePolicy="single_host_origin"
        clientId="801332565840-e9rr3msnj30eftt3lq5qb9a5j9ahsf7n.apps.googleusercontent.com"
      /> */}
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
