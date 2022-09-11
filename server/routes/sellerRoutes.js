import express from "express";
const router = express.Router();
import {
  authenticateSeller,
  registerSeller,
  addProducts,
  getCategoricalProducts,
  getOrders,
  updateOrderToAccepted,
  updateOrderToShipped,
  updateOrderToDelivered,
} from "../controllers/sellerControllers.js";
import { protectSeller } from "../middleware/authMiddleware.js";
//seller routing
router.route("/:id/products/:cat").get(protectSeller, getCategoricalProducts);
router.route("/register").post(registerSeller);
router.post("/login", authenticateSeller);
router.route("/:id/products/new").post(protectSeller, addProducts);
router.route("/:id/orders").get(protectSeller, getOrders);
router
  .route("/:id/orders/:orderid/accept")
  .put(protectSeller, updateOrderToAccepted);
router
  .route("/:id/orders/:orderid/ship")
  .put(protectSeller, updateOrderToShipped);
router
  .route("/:id/orders/:orderid/deliver")
  .put(protectSeller, updateOrderToDelivered);

export default router;
