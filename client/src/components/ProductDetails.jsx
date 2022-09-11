import React, { useEffect } from "react";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import './styles/ProductDetails.css'

//product details

const ProductDetails = ({ passedStoreId, passedProductId, visibility, setVisibility, setPopupStoreId, setPopupProductId }) => {

  const storeId = passedStoreId;
  const productId = passedProductId;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, productInfo } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(storeId, productId));
  }, [dispatch, storeId, productId, visibility, setPopupStoreId, setPopupProductId]);

  useEffect(() => {
    let popup = document.getElementById("popup");
    window.addEventListener("click", function(e) {
      if(e.target === popup) {
        setVisibility(false);
      }
    })
  })

  return (
    <>
      {visibility && (
          <div className="productPage productPopup">
          {loading ? (
            <div className="loaderPlaceHolder frcc">
              <Loader />
            </div>
          ) : error ? (
            <h2>{error.message}</h2>
          ) : (
              <div className='frcc' style={{marginTop:"30px"}} id='popup'> 
                <Product {...productInfo} />
              </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
