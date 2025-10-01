import { Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import { Order } from "../models/orderModel";
import { Cart } from "../models/cartModel";
import { Product } from "../models/Product";

// Create order from cart
export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "User not logged in" });

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalAmount = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      totalAmount += product.prodPrice * item.quantity;
    }

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
    });

    await order.save();

    // Optionally clear cart after order creation
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ success: true, message: "Order created", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all orders of user
export const getUserOrders = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  try {
    const orders = await Order.find({ userId }).populate("items.productId");
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (req: AuthenticatedRequest, res: Response) => {
  const { status } = req.body;
  const paramId = (req.params as any)?.id as string | undefined;
  const orderId = req.body.orderId ?? paramId;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!status) return res.status(400).json({ message: "Status is required" });

    order.status = status;
    await order.save();
    res.json({ success: true, message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
