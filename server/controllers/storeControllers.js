import asyncHandler from "express-async-handler";
import Store from "../models/storeModel.js";
import Product from "../models/productModel.js";
import generateToken from "../utils/generateToken.js";

//@desc: GET stores in a location
//@command: GET /api/stores?location=location
//@access: PUBLIC
//server store action handler

const getStores = asyncHandler(async (req, res) => {
  const postal = req.params.location;
  const foundStores = await Store.find({ "storeAddress.postal": postal });
  if (foundStores) res.send(foundStores);
  else {
    res.status(404);
    throw new Error("No stores found!");
  }
});

//@desc: FETCH all products in a store
//@command: GET /api/stores/:id/products
//@access: PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  res.json(store.products);
});

//@desc: FETCH a single product from a store
//@command: GET /api/stores/:id/products/:prod
//@access: PUBLIC
const getProductDetails = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.params.id);
  const product = await Product.findById(req.params.prod);
  if (product) {
    // res.json(product);
    res.json({ product, store });
  } else {
    res.status(404);
    throw new Error("Product not found!");
  }
});

export { getStores, getProducts, getProductDetails };
