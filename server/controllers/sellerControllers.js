import asyncHandler from "express-async-handler";
import Store from "../models/storeModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc: POST seller email & password & authenticate
//@command: POST /api/sellers/login
//@access: PUBLIC
//server seller action handler

const authenticateSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundStore = await Store.findOne({ email: email });
  if (foundStore && (await foundStore.matchPassword(password))) {
    res.json({
      _id: foundStore._id, //id
      name: foundStore.name,
      email: foundStore.email,
      storeAddress: foundStore.storeAddress,
      mobileNum: foundStore.mobileNum,
      filename: foundStore.filename,
      type: foundStore.type,
      products: foundStore.products,
      token: generateToken(foundStore._id),
    });
  } else {
    res.status(401); //Unauthorised
    throw new Error("Incorrect email or password!");
  }
});

//@desc: register new seller
//@command: POST /api/sellers/register
//@access: PUBLIC
const registerSeller = asyncHandler(async (req, res) => {
  const { email, password, mobileNum, filename, name, type, storeAddress } =
    req.body;
  const foundStore = await Store.findOne({ email: email });
  if (foundStore) {
    res.status(400);
    throw new Error("Seller already exists");
  }

  const store = await Store.create({
    name,
    email,
    password,
    mobileNum,
    filename,
    storeAddress,
    type,
  });

  if (store) {
    res.status(201).json({
      _id: store._id, //id
      email: store.email,
      token: generateToken(store._id),
      name: store.name,
      mobileNum: store.mobileNum,
      filename: store.filename,
      type: store.type,
      storeAddress: store.storeAddress,
    });
  } else {
    res.status(400);
    throw new Error("Invalid seller data");
  }
});

//@desc: POST new product info, authenticate seller & add products to store
//@command: POST /api/sellers/:id/products/new
//@access: PRIVATE
const addProducts = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.seller._id);
  const {
    title,
    price,
    discountedPrice,
    description,
    type,
    subType,
    filename,
    countInStock,
  } = req.body;

  if (store) {
    const newProduct = await Product.create({
      store: store._id,
      title,
      price,
      discountedPrice,
      description,
      type,
      subType,
      filename,
      countInStock,
    });

    store.products.push(newProduct);

    const updatedStore = await store.save();

    // const updatedStore = await Store.findByIdAndUpdate(store._id, {
    //   $push: { products: newProduct },
    // });

    res.json({
      _id: updatedStore._id, //id
      name: updatedStore.name,
      email: updatedStore.email,
      mobileNum: updatedStore.mobileNum,
      storeAddress: updatedStore.storeAddress,
      filename: updatedStore.filename,
      type: updatedStore.type,
      products: updatedStore.products,
      token: generateToken(updatedStore._id),
    });
  } else {
    res.status(404);
    throw new Error("Seller not found");
  }
});

//@desc: GET all products of a certain category/subCategory
//@command: GET /api/sellers/:id/products/:cat
//@access: PUBLIC
const getCategoricalProducts = asyncHandler(async (req, res) => {
  const cat = req.params.cat;
  const products = await Product.find({
    $or: [{ type: cat }, { subType: cat }],
  });
  if (products) res.send(products);
  else {
    res.status(404);
    throw new Error("No products found!");
  }
});

//@desc: GET all orders associated with a seller
//@command: GET api/sellers/:id/orders
//@access: PRIVATE
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    "orderItems.storeId": req.params.id,
  });

  if (orders) res.json(orders);
  else {
    res.status(404);
    throw new Error("No order found!");
  }
});

//@desc: update order to accepted
//@command: PUT api/sellers/:id/orders/:orderid/accept
//@access: PRIVATE
const updateOrderToAccepted = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderid);
  if (order) {
    order.isAccepted = true;
    order.acceptedAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc: update order to shipped
//@command: PUT api/sellers/:id/orders/:orderid/ship
//@access: PRIVATE
const updateOrderToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderid);
  if (order) {
    order.isShipped = true;
    order.shippedAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc: update order to delivered
//@command: PUT api/sellers/:id/orders/:orderid/deliver
//@access: PRIVATE
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderid);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  authenticateSeller,
  registerSeller,
  addProducts,
  getCategoricalProducts,
  getOrders,
  updateOrderToAccepted,
  updateOrderToShipped,
  updateOrderToDelivered,
};
