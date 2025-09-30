import { Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import { Order } from "../models/orderModel";

export const processPayment = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const { orderId, paymentMethod } = req.body;

  if (!userId) return res.status(401).json({ message: "User not logged in" });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Simulate payment success
    order.paymentStatus = "paid";
    order.status = "completed";

    await order.save();

    res.json({ success: true, message: "Payment successful", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
