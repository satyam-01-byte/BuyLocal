import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PreContentAnimation from "../components/PreContentAnimation";
import { catAndSub } from "../constants/catAndSubConstants";
import SearchBar from "../components/SearchBar";

//all the products seller has for sale

const SellerProductsScreen = () => {
  const sellerAddProduct = useSelector((state) => state.sellerAddProduct);
  const { sellerInfo, loading } = sellerAddProduct;

  let sellerInfoLocal = sellerInfo
    ? sellerInfo
    : JSON.parse(localStorage.getItem("sellerInfo"));

  const [products, setProducts] = useState(sellerInfoLocal.products);

  const categoryHandler = (cat) => {
    setProducts(sellerInfoLocal.products.filter((x) => x.type === cat));
  };

  const subCategoryHandler = (subCat) => {
    setProducts(sellerInfoLocal.products.filter((x) => x.subType === subCat));
  };

  const removeFilters = () => {
    setProducts(sellerInfoLocal.products);
  };

  return (
    <>
      {loading ? (
        <PreContentAnimation />
      ) : (
        <div className="productSection text-center">
          <Link
            to={`/sellers/${sellerInfoLocal._id}/products/new`}
            className="btn btn-primary m-1"
            id="newProduct"
          >
            Add new product
          </Link>
          <Link
            to={`/sellers/${sellerInfoLocal._id}/products/new/bulk`}
            className="btn btn-primary m-1"
            id="newProduct"
          >
            Add in bulk
          </Link>
          {/* <SearchBar /> */}
          <div className="mt-4">
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
          </div>

          <button className="btn btn-info" onClick={() => removeFilters()}>
            Remove filters
          </button>

          <div className="d-flex flex-row flex-wrap justify-content-evenly">
            {products &&
              products.map((product) => {
                return (
                  <div
                    className="card shadow p-3 m-5 bg-body rounded-3"
                    key={product._id}
                    id="sellerProduct"
                    style={{ height: "21rem" }}
                  >
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>

                    <img
                      src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${product.filename}`}
                      alt="product-pic"
                      className="mx-auto mt-2 rounded-3 bg-white"
                    />

                    <div className="card-body">
                      <h5 className="card-title text-truncate">
                        {product.title}
                      </h5>
                      <p>{product.type}</p>
                      <div className="prices frcc">
                        {!product.discountedPrice && <p>Rs. {product.price}</p>}

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
                      <p>In Stock: {product.countInStock}</p>
                    </div>
                  </div>
                );
              })}{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default SellerProductsScreen;
