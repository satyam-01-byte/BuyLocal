import express from "express";
const router = express.Router();
import { getCatProducts } from "../controllers/productControllers.js";

//products routing
router.route("/:cat").get(getCatProducts);

export default router;
