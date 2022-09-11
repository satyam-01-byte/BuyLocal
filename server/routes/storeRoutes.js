import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductDetails,
  getStores,
} from "../controllers/storeControllers.js";
//store routing
router.route("/location/:location").get(getStores);
router.route("/:id/products").get(getProducts);
router.route("/:id/products/:prod").get(getProductDetails);

export default router;
