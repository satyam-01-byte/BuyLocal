import React, { useState } from "react";
import Rating from "./Rating";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { addToCart } from "../actions/cartActions";

//product details 

const Product = (productInfo) => {
  const dispatch = useDispatch();

  function increaseByOne(stock) {
    qty < stock ? setQty(qty + 1) : setQty(qty);
  }
  function decreaseByOne() {
    qty > 1 ? setQty(qty - 1) : setQty(qty);
  }
  const [qty, setQty] = useState(1);

  const product = { ...productInfo.product };
  const store = { ...productInfo.store };
  
  //Renamed product above to prod and obtained matching product from store because filename was incorrect in catalogue of products
  // const product = (store && store.products.filter(p => p._id === prod._id))[0];

  const history = useHistory();
  const addToCartHandler = () => {
    dispatch(addToCart(store._id,product._id,qty));
    history.push(`/cart`);
    // setTimeout(() => {
    //   window.location.reload(false);
    // }, 3000)
  };

  // const closePopup = () => {
  //   let popup = document.getElementById('productPopped');
  //   let productPopup = document.getElementsByClassName("productPopup")[0];
  //   productPopup.style.display = 'none';
  //   popup.style.display = 'none';
  // }

  return (
    <div className="item" id='productPopped' style={{ height: "30rem",  maxWidth:"1000px", width:"85vw", zIndex:"1000" }}>
      {/* <i class="fas fa-times-circle" onClick={() => closePopup()}></i> */}
      
        <img src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${product.filename}`} alt="product-pic"/>

      <div className="info">
        <h3>
          <Link to={`/stores/${store._id}/products`}>{store.name}</Link>
        </h3>

        {/*disable rating-review*/}
        {/* <div>
          <Rating rating={product.rating} /> 
          <p>({product.numReviews} reviews)</p>
        </div> */}

        <h3>{product.title}</h3>
        <p style={{ width: "10rem" }}>{product.description}</p>
        <div className="prices frcc">
          {!product.discountedPrice && (
            <h4>Rs. {product.price}</h4>
          )}

          {product.discountedPrice &&
            product.price !== product.discountedPrice && (
              <>
                <h4>Rs. {product.discountedPrice}</h4>
                <h4>
                  <s style={{ color: "red" }}>
                    Rs. {product.price}
                  </s>
                </h4>
              </>
            )}
        </div>
        {product.countInStock > 0 ? (
          <>
          <div className="qtyForm">
            <button type="button"
            className="quantityChange btn btn-success rounded-circle fw-bolder" onClick={() => decreaseByOne()}>
              -
            </button>
            <p className="mt-3">{qty}</p>
            <button type="button"
            className="quantityChange btn btn-success rounded-circle fw-bolder"
              onClick={() => increaseByOne(product.countInStock)}
            >
              +
            </button>
          </div>
          <button
          className="altLink warningBtn"
          type="submit"
          disabled={product.countInStock === 0}
          onClick={() => addToCartHandler()}
        >
          Add to Cart
        </button>
        </>
        ) : (
          <>
            <h4 className="text-warning" >Out of Stock!</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
