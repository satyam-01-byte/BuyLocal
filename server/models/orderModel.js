import mongoose from "mongoose";

//order schema
//structure of the order object consisting of the all the necessary details

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userMobileNum: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        filename: { type: String, required: true },
        price: { type: String, required: true },
        storeName: { type: String, required: true },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        storeId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Store",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      requried: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    acceptedAt: {
      type: Date,
    },
    isShipped: {
      type: Boolean,
      required: true,
      default: false,
    },
    shippedAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
