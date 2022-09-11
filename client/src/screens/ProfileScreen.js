import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import { useHistory, Link } from "react-router-dom";
import { getAllMyOrders } from "../actions/orderActions";
import "./styles/ProfileScreen.css";

//user profile

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNum, setMobileNum] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const ordersAllMy = useSelector((state) => state.ordersAllMy);

  const { userInfo } = userLogin;
  const { loading, error, user } = userDetails;
  const { success } = userUpdateProfile;
  const { loading: loadingOrders, error: errorOrders, orders } = ordersAllMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getAllMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setMobileNum(user.mobileNum ? user.mobileNum : 0);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const reload = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Passwords do not match!");
    else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          mobileNum,
        })
      );

      setTimeout(() => {
        reload.go(0);
      }, 2500);
    }
  };

  let i = 1;

  return (
    <div className="placeorderScreen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form
            onSubmit={submitHandler}
            className="typeForm fcdd"
            style={{ margin: "0 10px" }}
          >
            {error && <h3>{error}</h3>}
            {message && <h3>{message}</h3>}
            {success && <h3>Profile updated!</h3>}
            <h2 style={{ textAlign: "center" }}>Your Profile</h2>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              placeholder={name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email">Email address: </label>
            <input
              type="email"
              id="email"
              placeholder={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="mobileNum">Mobile number: </label>
            <input
              type="number"
              id="mobileNum"
              placeholder={mobileNum}
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
              required
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password to change it"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter same password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="formBtn">
              Update
            </button>
          </form>
          {orders && orders.length !== 0 && (
            <div className="orders">
              <h2>Orders</h2>
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <h3>{errorOrders}</h3>
              ) : (
                <table className="table table-success table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Order Id</th>
                      <th scope="col">Date</th>
                      <th scope="col">Total (Rs.)</th>
                      <th scope="col">Paid</th>
                      <th scope="col">Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <th scope="row">{i++}</th>
                        <td>
                          <Link to={`/orders/${order._id}`}>
                            {order._id.substring(5, 10)}
                          </Link>
                        </td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            <i
                              className="fas fa-check"
                              style={{ color: "green" }}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileScreen;
