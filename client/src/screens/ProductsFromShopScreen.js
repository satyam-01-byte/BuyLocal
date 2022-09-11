import React, { useState, useEffect } from "react";
// import { products } from "../products";
//import Products from "../components/Products";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
//import Loader from "../components/Loader";
import PreContentAnimation from "../components/PreContentAnimation";
import Rating from "../components/Rating";
import ProductDetails from "../components/ProductDetails";
import SearchBar from "../components/SearchBar";
import { catAndSub } from "../constants/catAndSubConstants";

/**
 * shows all available items in a certain store
 * and their details
 */

const ProductsFromShopScreen = ({ match }) => {
  function productPopUp(storeId, product_id) {
    setPopupProductId(product_id);
    setPopupStoreId(storeId);
    setPopupVisibility(true);
  }

  function closePopup(e) {
    if (popupVisibility && e.keyCode === 27) {
      setPopupVisibility(false);
      setPopupProductId("");
      setPopupStoreId("");
    }
  }
  const storeId = match.params.id;
  // const [products, setProducts] = useState([]);
  const [popupStoreId, setPopupStoreId] = useState("");
  const [popupProductId, setPopupProductId] = useState("");
  const [popupVisibility, setPopupVisibility] = useState(false);
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error } = productList;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    !loading && setProducts(productList.products);
  }, [productList.products, loading]);

  const categoryHandler = (cat) => {
    setProducts(productList.products.filter((x) => x.type === cat));
    window.scrollTo(0, 0);
  };

  const subCategoryHandler = (subCat) => {
    setProducts(productList.products.filter((x) => x.subType === subCat)); //w/ proper types and subTypes, it should be s.subType
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(listProducts(storeId));
  }, [dispatch, storeId]);

  const removeFilters = () => {
    setProducts(productList.products);
    window.scrollTo(0, 0);
  };

  return (
    <div className="listItemsPage text-center">
      {loading ? (
        <PreContentAnimation />
      ) : error ? (
        <h2>{error.message}</h2>
      ) : (
        <section>
          {/*filter*/}
          {document.addEventListener("keydown", closePopup)}
          {/* <SearchBar /> */}
          <div className="mt-5 sticky-top bg-white" style={{ zIndex: "1" }}>
            {Object.keys(catAndSub).map(function (key, index) {
              return (
                <div key={index} className="m-2 btn-group">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => categoryHandler(key)}
                  >
                    {key}
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning dropdown-toggle dropdown-toggle-split"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>

                  <ul className="dropdown-menu">
                    {catAndSub[key].map((value, index) => (
                      <li
                        key={index}
                        onClick={() => subCategoryHandler(value)}
                        className="dropdown-item"
                      >
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            <button className="btn btn-info" onClick={() => removeFilters()}>
              Remove filters
            </button>
          </div>

          <div className="itemList">
            {/*product-popup*/}
            <ProductDetails
              passedProductId={popupProductId}
              passedStoreId={popupStoreId}
              visibility={popupVisibility}
              setVisibility={setPopupVisibility}
              setPopupProductId={setPopupProductId}
              setPopupStoreId={setPopupStoreId}
            />
            {products &&
              products.map((product) => {
                //return <Products product={product} key={product._id} />;
                return (
                  <div key={product._id}>
                    <div
                      className="card shadow p-3 m-5 bg-body rounded-3"
                      onClick={() => productPopUp(storeId, product._id)}
                      style={{ height: "19rem" }}
                    >
                      <img
                        src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${product.filename}`}
                        alt="product-pic"
                        className="mx-auto mt-2 rounded-3 bg-white"
                        style={{ width: "8rem" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-truncate">
                          {product.title}
                        </h5>

                        <div className="card-text d-flex flex-row justify-content-center">
                          {!product.discountedPrice && (
                            <p>Rs. {product.price}</p>
                          )}

                          {product.discountedPrice &&
                            product.price !== product.discountedPrice && (
                              <>
                                <p className="mx-2">
                                  Rs. {product.discountedPrice}
                                </p>
                                <p>
                                  <s className="text-danger">
                                    Rs. {product.price}
                                  </s>
                                </p>
                              </>
                            )}
                        </div>
                        <button className="btn btn-warning rounded-pill">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductsFromShopScreen;
