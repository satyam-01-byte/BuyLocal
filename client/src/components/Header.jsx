import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import "./styles/Header.css";
import {
  Button,
  Container,
  FormControl,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import Logo from "./logos/logo.png";
import { GeoAlt, Cart3, HouseDoor } from "react-bootstrap-icons";
import { useState } from "react";
//Header

function LocationModal({ show, handleClose }) {
  const history = useHistory();
  const [location, setLocation] = useState(""); 

  const handleLocationChange = (e) => {
    // todo change location
    e.preventDefault();
    var ele = document.getElementById("locMessage");
    if (location === "841301" || location === "711101" || location === "711103" || location === "711106") {
      //ele.style.display = "none";
      localStorage.setItem("userLocation", JSON.stringify(location));
      handleClose();
      history.push(`/stores/location/${location}`);
    } else {
      ele.style.display = "block";
      ele.textContent = "Pincode not servicable yet";
      setTimeout(() => {
        ele.style.display = "none";
      }, 2000);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Pincode</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl type="number" placeholder="pincode" onChange={(e) => setLocation(e.target.value)} />
      </Modal.Body>
      <p class="alert alert-danger" role="alert" id="locMessage" style={{display:"none"}}>
        </p>
      <Modal.Footer>
        <Button variant="" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLocationChange}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Header = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const location = JSON.parse(localStorage.getItem("userLocation"));

  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
    setTimeout(() => {
      history.push(`/stores/location/${location}`);
    }, 1500);
  };

  const homeRedirect = () => {
    location ? history.push(`/stores/location/${location}`) : history.push("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <LocationModal show={showModal} handleClose={handleModalClose} />
      <Container>
        <Navbar.Brand style={{ margin: 0 }} onClick={homeRedirect}>
          <img
            src={Logo}
            height="50px"
            className="d-inline-block align-top"
            alt="Locer"
          />
        </Navbar.Brand>
        <Navbar.Toggle style={{ height: "40px" }} />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link className="align-items-center" onClick={homeRedirect}>
              Home <HouseDoor color="black" />
            </Nav.Link>
            {location && (
              <Nav.Link
                className="align-items-center"
                onClick={handleModalOpen}
              >
                Location <GeoAlt color="black" />
              </Nav.Link>
            )}
            {userInfo ? (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            <Nav.Link className="align-items-center" href="/cart">
              Cart <Cart3 />
              <span>{cartItems.length}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
