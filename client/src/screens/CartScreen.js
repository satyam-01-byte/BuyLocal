import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import { listStores } from "../actions/storeActions";
import "./styles/CartScreen.css";
/**
 * after adding product in cart or direct cart screen
 * details of the items in the cart and the total amout
 */

const CartScreen = ({ match, location, history }) => {
  function increaseByOne(item) {
    //increases the quantity by one
    if (item.qty < item.countInStock) {
      item.qty = item.qty + 1;
      dispatch(addToCart(item.storeId, item.id, item.qty));
    }
  }
  function decreaseByOne(item) {
    //decreases the quantity by one
    if (item.qty > 1) {
      item.qty = item.qty - 1;
      dispatch(addToCart(item.storeId, item.id, item.qty));
      //if (item.qty === 0) dispatch(removeFromCart(item.id));
    }
  }

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let currentStoreId = cartItems.length > 0 ? cartItems[0].storeId : null;

  const removeFromCartHandler = (id) => {
    //removes an item from the cart
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    //proceeds to checkout
    history.push("/login?redirect=shipping");
  };

  const userLocation = JSON.parse(localStorage.getItem("userLocation"));

  let newItems = [];

  const addNewStoreItems = () => {
    localStorage.setItem("cartItems", JSON.stringify(newItems));
    window.location.reload(false);
  };

  const totalAmount = () => {
    var lengthOfCart = cartItems.length
    var amount =  0;
    for(var i=0;i<lengthOfCart;i++){
      if(cartItems[i].discountedPrice)
      amount = amount + (cartItems[i].qty * cartItems[i].discountedPrice)
      else {
        amount = amount + (cartItems[i].qty * cartItems[i].price)
      }
    }
    return amount
  };

  const storeList = useSelector((state) => state.storeList);
  const { loading, stores } = storeList;

  let currentStore, minAmount;
  if (loading === false) {
    currentStore = stores.filter((store) => store._id === currentStoreId);
    minAmount = currentStore.length > 0 && currentStore[0].minAmount;
  }

  useEffect(() => {
    dispatch(listStores(userLocation));
  }, [dispatch, userLocation]);

  return (
    <div className="cartPage text-center">
      {cartItems.map(
        (item) =>
          item.storeId !== currentStoreId && (
            <div id="cartPopup" key={item.id}>
              <h3>Your cart already contains items from another store.</h3>
              <h3>Remove them to add items from new store.</h3>
              <div className="frcc">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => addNewStoreItems()}
                >
                  Remove previous items
                </button>
                <p>&nbsp;</p>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => removeFromCartHandler(item.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )
      )}
      {cartItems.length === 0 ? (
        <h3>
          Your cart is empty!{" "}
          <Link to={`/stores/location/${userLocation}`}>Start Shopping</Link>
        </h3>
      ) : (
        <div className="cart">
          <h1>Your Cart</h1>
          <Link to={`/stores/${currentStoreId}/products`}>
            <button type="button" className="btn btn-primary">
              Add more items
            </button>
          </Link>
          <div className="cartDetails">
            <div className="cartItems">
              {
                //loading all the cart item which are cached locally
                cartItems.map((item) =>
                  item.storeId === currentStoreId ? (
                    <div
                      className="item productItem"
                      key={item.id}
                      style={{ height: "20rem", width: "24rem" }}
                    >
                      <Link to={`/stores/${item.storeId}/products/${item.id}`}>
                        <img
                          src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${item.filename}`}
                          alt={item.title}
                        />
                      </Link>
                      <div className="info">
                        <h5>
                          <Link
                            to={`/stores/${item.storeId}/products/${item.id}`}
                          >
                            {item.title}
                          </Link>
                        </h5>
                        <Link to={`/stores/${item.storeId}/products`}>
                          {item.storeName}
                        </Link>
                        <div className="card-text d-flex flex-row justify-content-center mt-2">
                          {!item.discountedPrice && <p>Rs. {item.price}</p>}

                          {item.discountedPrice &&
                            item.price !== item.discountedPrice && (
                              <>
                                <p className="mx-2">
                                  Rs. {item.discountedPrice}
                                </p>
                                <p>
                                  <s className="text-danger">
                                    Rs. {item.price}
                                  </s>
                                </p>
                              </>
                            )}
                        </div>
                        {item.countInStock > 0 ? (
                          <div className="qtyForm">
                            <button
                              type="button"
                              className="quantityChange btn btn-success rounded-circle fw-bolder"
                              onClick={() => decreaseByOne(item)}
                            >
                              -
                            </button>

                            <p className="mt-3">{item.qty}</p>
                            <button
                              className="quantityChange btn btn-success rounded-circle fw-bolder"
                              onClick={() => increaseByOne(item)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <>
                            <p className="text-danger">Out of Stock</p>
                          </>
                        )}
                        <button
                          className="btn btn-danger rounded-pill"
                          type="button"
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          <i className="fas fa-trash"></i> Remove item
                        </button>
                      </div>
                    </div>
                  ) : (
                    newItems.push(item)
                  )
                )
              }
            </div>

            <div className="paymentInfo">
              <h3>
                Subtotal (
                {
                  //calculating the total items and amount
                  cartItems.reduce((acc, item) => acc + item.qty * 1, 0)
                }
                ) items:
              </h3>
              <h2>
                Rs. {""}
                {/* {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)} */}
                {totalAmount()}
              </h2>
              {loading ? (
                <p>&nbsp;</p>
              ) : totalAmount() < minAmount ? (
                <span>
                  Minimum order amount for this store is Rs. {minAmount}.{" "}
                  <Link to={`/stores/${currentStoreId}/products`}>
                    Add items{" "}
                  </Link>{" "}
                  worth Rs. {minAmount - totalAmount()}.
                </span>
              ) : (
                <button
                  // id="checkoutBtn"
                  className="formBtn"
                  type="button"
                  disabled={
                    cartItems.length === 0 ||
                    newItems.length > 0 ||
                    totalAmount() < minAmount
                  }
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
