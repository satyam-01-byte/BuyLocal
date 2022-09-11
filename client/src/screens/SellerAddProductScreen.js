import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProduct } from "../actions/sellerActions";
import { catAndSub } from "../constants/catAndSubConstants";

//seller adding new product

const SellerAddProductScreen = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [price, setPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(price);
  // const [qty, setQty] = useState();
  // const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [filename, setFilename] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const sellerId = match.params.id;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addProduct(
        title,
        price,
        discountedPrice,
        description,
        type,
        subType,
        filename,
        countInStock,
        sellerId
      )
    );

    setTimeout(() => {
      history.push(`/sellers/${sellerId}/products`);
    }, 1000);
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
      <h2>Add new product</h2>
      <form onSubmit={submitHandler} className="typeForm fcdd">
        <label htmlFor="name">Name*: </label>
        <input
          type="text"
          id="name"
          value={title}
          placeholder="Green apple"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        Category*:{" "}
        <select
          name="type"
          id="type"
          onChange={(e) => setType(e.target.value)}
          style={{ marginBottom: "30px" }}
          required
        >
          <option value="" selected="selected">
            Select category
          </option>
        </select>
        Sub-category*:{" "}
        <select
          name="subType"
          id="subType"
          onChange={(e) => setSubType(e.target.value)}
          style={{ marginBottom: "30px" }}
          required
        >
          <option value="" selected="selected">
            Select category first
          </option>
        </select>
        {
          (window.onload = () => {
            let catSel = document.getElementById("type");
            let subCatSel = document.getElementById("subType");
            for (let x in catAndSub)
              catSel.options[catSel.options.length] = new Option(x, x);
            catSel.onchange = () => {
              subCatSel.length = 1; // remove all options bar first
              // display correct values
              let z = catAndSub[catSel.value];
              for (let i = 0; i < z.length; i++)
                subCatSel.options[subCatSel.options.length] = new Option(
                  z[i],
                  z[i]
                );
            };
          })
        }
        <label htmlFor="price">Price* (Rs.): </label>
        <input
          type="number"
          id="price"
          value={price}
          placeholder="10"
          min="0"
          onChange={(e) =>
            setPrice(e.target.value) && setDiscountedPrice(e.target.value)
          }
          required
        />
        <label htmlFor="discountedPrice">
          Discounted Price (Rs.) [if any]:{" "}
        </label>
        <input
          type="number"
          id="discountedPrice"
          value={discountedPrice}
          placeholder="8"
          min="0"
          onChange={(e) => setDiscountedPrice(e.target.value)}
        />
        {/* <p style={{ textAlign: "left" }}>Quantity*</p>
        <span>
          <p>per</p>
          <label htmlFor="quantity"></label>
          <input
            type="number"
            id="quantity"
            value={qty}
            placeholder="1"
            min="0"
            onChange={(e) => setQty(e.target.value)}
            required
          />
          <label htmlFor="unit"></label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          >
            <option value="piece">piece</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
          </select>
        </span> */}
        <label htmlFor="description">Description*: </label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          value={description}
          placeholder="Fresh, green apples fetched from the orchids of Kashmir."
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label htmlFor="image">Upload image*(s): </label>
        <input
          type="file"
          id="image"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          required
        />
        <label htmlFor="totalStock">Total Available items*: </label>
        <input
          type="number"
          id="totalStock"
          value={countInStock}
          placeholder="10"
          min="0"
          onChange={(e) => setCountInStock(e.target.value)}
          required
        />
        <button type="submit" className="formBtn">
          Save
        </button>
      </form>
    </div>
  );
};

export default SellerAddProductScreen;
