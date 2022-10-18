import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStores } from "../actions/storeActions";
import { Link } from "react-router-dom";
import "./styles/StoresScreen.css";
import PreContentAnimation from "../components/PreContentAnimation";
import SearchBar from "../components/SearchBar";

//nearby stores screen

const StoresScreen = ({ match }) => {
  const dispatch = useDispatch();

  const storeList = useSelector((state) => state.storeList);
  const { loading, error, stores } = storeList;

  useEffect(() => {
    dispatch(listStores(match.params.location));
  }, [dispatch, match]);

  return (
    <>
      {/* <div
        style={{
          width: "100vw",
          margin: "40px 0",
          display: "flex",
          justifyContent: "center",
          padding: "30px 0",
        }}
      >
        <img
          src="https://res.cloudinary.com/locer/image/upload/v1636008288/locer/posters/poster2.png"
          alt="sale2"
          width="80%"
          height="150px"
          style={{ maxWidth: "600px", minWidth: "350px" }}
        />
      </div> */}
      <div className="listItemsPage">
        {loading ? (
          <PreContentAnimation />
        ) : error ? (
          <h2>{error.message}</h2>
        ) : (
          <section className="fcdc">
            <SearchBar />
            {stores.length ? (
              <div className="searchBarAndMessage">
                {/* <h2>Stores near you</h2> */}
                {/* <SearchBar style={{ marginLeft: "4rem" }} /> */}
              </div>
            ) : (
              <h2>No stores near you</h2>
            )}
            <div className="frcdw text-center">
              {stores.map((store) => {
                return (
                  <div className="item" key={store._id}>
                    <Link
                      to={`/stores/${store._id}/products`}
                      className="image frcc"
                    >
                      <img
                        // src={`/images/logos/${store.filename}`}
                        src={`https://res.cloudinary.com/locer/image/upload/v1629552684/locer/logos/${store.filename}`}
                        alt="store-logo"
                      />
                    </Link>
                    <div className="info">
                      <h5>
                        <Link
                          to={`/stores/${store._id}/products`}
                          className="storeName"
                        >
                          {store.name}
                        </Link>
                      </h5>
                      <p>{store.type}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default StoresScreen;
