import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { login } from "../actions/sellerActions.js";
import { togglePassword } from "../components/PasswordFunctions";

//seller logi

const SellerLogin = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const sellerLogin = useSelector((state) => state.sellerLogin);
  const { loading, error, sellerInfo } = sellerLogin;

  useEffect(() => {
    if (sellerInfo) {
      history.push(`/sellers/${sellerInfo._id}/products`);
    }
  }, [history, sellerInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="fccc" style={{ marginTop: "80px" }}>
      <h1 className="sellerLogoRest">
        <Link to="/sellers">Locer</Link>
      </h1>
      <h2>Login</h2>
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
      <p>or, login with</p>
      <span className="googlefb">
        <i className="fab fa-google"></i>
        <i className="fab fa-facebook"></i>
      </span>
      <h3>
        Not registered as as seller?{" "}
        <Link to="/sellers/register">Register</Link>
      </h3>
    </div>
  );
};

export default SellerLogin;
