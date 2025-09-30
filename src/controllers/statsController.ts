import { Request, Response } from "express";
import { Order } from "../models/orderModel";
import {Product} from "../models/Product";
import { User } from "../models/userModel"; // if you have a User model

export const getStats = async (req: Request, res: Response) => {
  try {
    // Total Sales
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Total Orders
    const totalOrders = orders.length;

    // Products Sold
    const productsSold = orders.reduce(
      (sum, order) => sum + order.products.reduce((s, p) => s + p.quantity, 0),
      0
    );

    // New Customers Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newCustomers = await User.countDocuments({ createdAt: { $gte: today } });

    res.status(200).json({
      totalSales,
      totalOrders,
      productsSold,
      newCustomers,
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    res.status(500).json({ message: "Error fetching stats", error });
  }
};
