import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/sellerActions";
import Loader from "../components/Loader";
import {
  togglePassword,
  toggleConfirmPassword,
  checkPasswordStrength,
} from "../components/PasswordFunctions";

//seller registration

const SellerRegister = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNum, setMobileNum] = useState();

  const [filename, setFilename] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal, setPostal] = useState();
  const [country, setCountry] = useState("");

  const storeAddress = {
    address: address,
    city: city,
    state: state,
    postal: postal,
    country: country,
  };

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const sellerRegister = useSelector((state) => state.sellerRegister);
  const { loading, error } = sellerRegister;

  const sellerLogin = useSelector((state) => state.sellerLogin).sellerInfo;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (sellerLogin) {
      history.push(`/sellers/${sellerLogin._id}/products`);
    }
  }, [history, sellerLogin]);

  const submitHandler1 = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Passwords do not match!");
    // else dispatch(register(email, password));
    else {
      document.getElementById("sellerRegisterForm").style.display = "none";
      document.getElementById("sellerDetailsForm").style.display = "flex";
    }
  };

  const submitHandler2 = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) setMessage("Passwords do not match!");
    // else dispatch(register(email, password));
    document.getElementById("sellerDetailsForm").style.display = "none";
    document.getElementById("sellerAddressForm").style.display = "flex";
  };

  const submitHandler3 = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) setMessage("Passwords do not match!");
    // else dispatch(register(email, password));
    dispatch(
      register(email, password, mobileNum, filename, name, type, storeAddress)
    );
  };

  return (
    <div className="fccc" style={{ marginTop: "80px" }}>
      <h1 className="sellerLogoRest">
        <Link to="/sellers">Locer</Link>
      </h1>
      <h2>Register</h2>
      {error && <h3>{error}</h3>}
      {message && <h3>{message}</h3>}
      {loading && <Loader />}
      <form
        onSubmit={submitHandler1}
        className="typeForm fcdd"
        id="sellerRegisterForm"
      >
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
      <h3 style={{ textAlign: "center" }}>
        Already registered as a seller?{" "}
        <Link
          to={
            redirect ? `/sellers/login?redirect=${redirect}` : "/sellers/login"
          }
        >
          Log-in
        </Link>
      </h3>

      <form
        onSubmit={submitHandler2}
        className="typeForm fcdd"
        id="sellerDetailsForm"
      >
        <label htmlFor="image">Upload image:</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setFilename(e.target.value)}
          required
        />

        <label htmlFor="name">Business name: </label>
        <input
          type="text"
          id="name"
          placeholder="Enter business name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="type">Enter business type: </label>
        <input
          type="text"
          id="type"
          placeholder="Enter business category"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <button type="submit" className="formBtn">
          Continue
        </button>
      </form>

      <form
        onSubmit={submitHandler3}
        className="typeForm fcdd"
        id="sellerAddressForm"
      >
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          placeholder="Enter business address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          placeholder="Enter business city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label htmlFor="state">State: </label>
        <input
          type="text"
          id="state"
          placeholder="Enter business state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label htmlFor="postal">Postal code: </label>
        <input
          type="number"
          id="postal"
          placeholder="Enter postal code"
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          required
        />
        <label htmlFor="country">Country: </label>
        <input
          type="text"
          id="country"
          placeholder="Enter business country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <button type="submit" className="formBtn">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default SellerRegister;
