import express from "express";
const router = express.Router();
import {
  authenticateUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protectUser } from "../middleware/authMiddleware.js";
//user routing
router.route("/register").post(registerUser); //"/"
router.post("/login", authenticateUser);
router
  .route("/profile")
  .get(protectUser, getUserProfile)
  .put(protectUser, updateUserProfile);

export default router;
