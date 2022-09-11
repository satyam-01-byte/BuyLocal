import { protectUser } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getAllMyOrders,
  getOrderById,
  updateOrderToPaid,
  generateRazorpayOrder,
  verifyPay,
} from "../controllers/orderControllers.js";

//order routing

router.route("/").post(protectUser, addOrderItems);
//router.route("/pay").post(protectUser, generateRazorpayOrder);
router.route("/pay").post(generateRazorpayOrder);
router.route("/verifypay").post(verifyPay);
router.route("/allmy").get(protectUser, getAllMyOrders);
router.route("/:id").get(protectUser, getOrderById);
router.route("/:id/pay").put(protectUser, updateOrderToPaid);

export default router;
