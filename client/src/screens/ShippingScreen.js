import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { addressConstant } from "../constants/addressConstant";

//user shippping details screen

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  if (!userLogin.userInfo) history.push("/login");

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [district, setDistrict] = useState("");
  const [state, setState] = useState(shippingAddress.state);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  //const [country, setCountry] = useState(shippingAddress.country);
  const [country, setCountry] = useState("India");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, state, postalCode, country })
    );
    history.push("/payment");
  };

  const reload = useHistory();
  setTimeout(() => {
    if (!window.location.hash) {
      window.location += "#loaded";
      reload.go(0);
    }
  }, 1);

  return (
    <div className="fccc">
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={submitHandler} className="typeForm fcdd">
        State/UT*:{" "}
        <select
          name="state"
          id="state"
          onChange={(e) => setState(e.target.value)}
          style={{ marginBottom: "30px" }}
          required
        >
          <option value="" selected="selected">
            Select state
          </option>
        </select>
        District*:{" "}
        <select
          name="district"
          id="district"
          onChange={(e) => setDistrict(e.target.value)}
          style={{ marginBottom: "30px" }}
          required
        >
          <option value="" selected="selected">
            Select state first
          </option>
        </select>
        City/Town*:{" "}
        <select
          name="city"
          id="city"
          onChange={(e) => setCity(e.target.value)}
          style={{ marginBottom: "30px" }}
          required
        >
          <option value="" selected="selected">
            Select district first
          </option>
        </select>
        Pincode*:{" "}
        <select
          name="pincode"
          id="pincode"
          onChange={(e) => setPostalCode(e.target.value)}
          style={{ marginBottom: "30px" }}
          required
        >
          <option value="" selected="selected">
            Select city first
          </option>
        </select>
        {
          (window.onload = () => {
            let stateSel = document.getElementById("state");
            let districtSel = document.getElementById("district");
            let citySel = document.getElementById("city");
            let pincodeSel = document.getElementById("pincode");
            for (let x in addressConstant)
              stateSel.options[stateSel.options.length] = new Option(x, x);
            stateSel.onchange = () => {
              districtSel.length = 1;
              citySel.length = 1;
              pincodeSel.length = 1;
              // display correct values
              for (let y in addressConstant[stateSel.value])
                districtSel.options[districtSel.options.length] = new Option(
                  y,
                  y
                );
            };
            districtSel.onchange = () => {
              citySel.length = 1;
              pincodeSel.length = 1;
              // display correct values
              for (let z in addressConstant[stateSel.value][districtSel.value])
                citySel.options[citySel.options.length] = new Option(z, z);
            };
            citySel.onchange = () => {
              pincodeSel.length = 1;
              // display correct values
              pincodeSel.options[pincodeSel.options.length] = new Option(
                addressConstant[stateSel.value][districtSel.value][
                  citySel.value
                ],
                addressConstant[stateSel.value][districtSel.value][
                  citySel.value
                ]
              );
            };
          })
        }
        <label htmlFor="address">Address (Street): </label>
        <input
          type="text"
          id="address"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit" className="formBtn">
          Save
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
