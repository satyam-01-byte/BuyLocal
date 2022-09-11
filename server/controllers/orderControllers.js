import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto";
//server order action handler

//@desc: pay order amount
//@command: POST /api/orders/pay
//@access: PRIVATE

export const generateRazorpayOrder = asyncHandler(async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RZRPAY_KEY_ID,
    key_secret: process.env.RZRPAY_KEY_SECRET,
  });

  const payment_capture = 1;
  const amount = Number(req.body.totalPrice);
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

//@desc: verify order payment
//@command: POST /api/orders/verifypay
//@access: PRIVATE

export const verifyPay = asyncHandler(async (req, res) => {
  // do a validation
  const secret = process.env.RZRPAY_KEY_SECRET;
  try {
    // getting the details back from our front-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", secret);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Illegitimate transaction!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    res.json({
      msg: "payment verified",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//@desc: create new order
//@command: POST /api/orders
//@access: PRIVATE

export const addOrderItems = asyncHandler(async (req, res) => {
  //getting order details
  const {
    user,
    userMobileNum,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user,
      userMobileNum,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@desc: GET order by id
//@command: GET api/orders/:id
//@access: PRIVATE
export const getOrderById = asyncHandler(async (req, res) => {
  //getting order by the id
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email mobileNum"
  );
  if (order) res.json(order);
  else {
    res.status(404);
    throw new Error("No order found!");
  }
});

//@desc: GET all my orders
//@command: GET api/orders/allmy
//@access: PRIVATE
export const getAllMyOrders = asyncHandler(async (req, res) => {
  const myorders = await Order.find({ user: req.user._id });
  res.json(myorders);
  // else {
  //   res.status(404);
  //   throw new Error("No order found!");
  // }
});

//@desc: update order to paid
//@command: PUT api/orders/:id/pay
//@access: PRIVATE
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    //paypal payment result, scrap & use razorpay
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
