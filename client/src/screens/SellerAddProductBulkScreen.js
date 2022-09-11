import React from "react";
import { catAndSub } from "../constants/catAndSubConstants";
import { useDispatch, useSelector } from "react-redux";
import { getCategoricalProducts } from "../actions/sellerActions";
//import axios from "axios";

const SellerAddProductBulkScreen = () => {
  const sellerId = localStorage.getItem("sellerInfo")._id;
  const dispatch = useDispatch();
  const sellerProductFilter = useSelector((state) => state.sellerProductFilter);
  const { loading, error, success, products } = sellerProductFilter;
  const categoryHandler = async (e) => {
    dispatch(getCategoricalProducts(sellerId, e));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <h3>Choose from the catalogue</h3>
        {Object.keys(catAndSub).map(function (key, index) {
          return (
            <div key={index} className="categoryFilter">
              <h4
                onClick={() => categoryHandler(key)}
                style={{ cursor: "pointer" }}
              >
                {key}
              </h4>
              {catAndSub[key].map((value, index) => {
                return (
                  <div key={index}>
                    <h5
                      onClick={() => categoryHandler(value)}
                      style={{ cursor: "pointer" }}
                    >
                      {value}
                    </h5>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div>
        {loading ? (
          /*******skeleton animation*******/
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                margin: "10px",
                width: "500px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey",
                  margin: "10px",
                }}
              ></div>
              <div>
                <h6 style={{ backgroundColor: "grey", width: "100px" }}>.</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h6
                    style={{
                      backgroundColor: "grey",
                      width: "30px",
                      margin: "2px",
                    }}
                  >
                    .
                  </h6>
                  <h6 style={{ backgroundColor: "grey", width: "30px" }}>.</h6>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                margin: "10px",
                width: "500px",
                //border: "1px solid black",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey",
                  margin: "10px",
                }}
              ></div>
              <div>
                <h6 style={{ backgroundColor: "grey", width: "100px" }}>.</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h6
                    style={{
                      backgroundColor: "grey",
                      width: "30px",
                      margin: "2px",
                    }}
                  >
                    .
                  </h6>
                  <h6 style={{ backgroundColor: "grey", width: "30px" }}>.</h6>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                margin: "10px",
                width: "500px",
                //border: "1px solid black",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey",
                  margin: "10px",
                }}
              ></div>
              <div>
                <h6 style={{ backgroundColor: "grey", width: "100px" }}>.</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h6
                    style={{
                      backgroundColor: "grey",
                      width: "30px",
                      margin: "2px",
                    }}
                  >
                    .
                  </h6>
                  <h6 style={{ backgroundColor: "grey", width: "30px" }}>.</h6>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                margin: "10px",
                width: "500px",
                //border: "1px solid black",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey",
                  margin: "10px",
                }}
              ></div>
              <div>
                <h6 style={{ backgroundColor: "grey", width: "100px" }}>.</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h6
                    style={{
                      backgroundColor: "grey",
                      width: "30px",
                      margin: "2px",
                    }}
                  >
                    .
                  </h6>
                  <h6 style={{ backgroundColor: "grey", width: "30px" }}>.</h6>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                margin: "10px",
                width: "500px",
                //border: "1px solid black",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey",
                  margin: "10px",
                }}
              ></div>
              <div>
                <h6 style={{ backgroundColor: "grey", width: "100px" }}>.</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h6
                    style={{
                      backgroundColor: "grey",
                      width: "30px",
                      margin: "2px",
                    }}
                  >
                    .
                  </h6>
                  <h6 style={{ backgroundColor: "grey", width: "30px" }}>.</h6>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                margin: "10px",
                width: "500px",
                //border: "1px solid black",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "grey",
                  margin: "10px",
                }}
              ></div>
              <div>
                <h6 style={{ backgroundColor: "grey", width: "100px" }}>.</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h6
                    style={{
                      backgroundColor: "grey",
                      width: "30px",
                      margin: "2px",
                    }}
                  >
                    .
                  </h6>
                  <h6 style={{ backgroundColor: "grey", width: "30px" }}>.</h6>
                </div>
              </div>
            </div>
          </div>
        ) : /***********skeleton animation************/
        error ? (
          <p>{error}</p>
        ) : (
          success &&
          products.map((product) => {
            return (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  margin: "10px",
                  maxWidth: "500px",
                  border: "1px solid black",
                }}
              >
                <div className="image">
                  <img
                    src={`https://res.cloudinary.com/locer/image/upload/v1629819047/locer/products/${product.filename}`}
                    //src={`/images/products/${d.filename}`}
                    alt="productPic"
                    style={{ width: "100px", height: "auto" }}
                  />
                </div>
                <div className="info">
                  <h6>{product.title}</h6>
                  <div
                    className="price"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h6>Rs. {product.discountedPrice}</h6>
                    <h6>
                      <s>Rs. {product.price}</s>
                    </h6>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SellerAddProductBulkScreen;
