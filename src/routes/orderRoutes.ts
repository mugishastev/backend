import express from "express";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus
} from "../controllers/orderController";

import { requireSignin, checkAdmin } from "../middlewares/authenitacationFunction";

const orderRouter = express.Router();

// Routes
orderRouter.post("/createorder", requireSignin, createOrder); // Create order
orderRouter.get("/getorder", requireSignin, getUserOrders); // Get all orders of logged-in user

// Admin-only routes
orderRouter.put("/:id/status", requireSignin, checkAdmin, updateOrderStatus); // Update order status
// (Optional) add deleteOrder or getOrderById if you implement them

export default orderRouter;
