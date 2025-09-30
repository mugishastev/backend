import { Response } from "express";
import { Types } from "mongoose";
import { Cart } from "../models/cartModel";
import { AuthenticatedRequest } from "../types/express";

// ---------------- ADD ITEM TO CART ----------------
export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const { productId, quantity } = req.body;
    const qty = Number(quantity);
    if (!productId || qty <= 0)
      return res.status(400).json({ message: "Invalid productId or quantity" });

    const userObjectId = new Types.ObjectId(req.userId);

    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) cart = new Cart({ userId: userObjectId, items: [] });

    // Check if product exists in cart
    const existingItem = cart.items.find(item =>
      item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ productId: new Types.ObjectId(productId), quantity: qty });
    }

    await cart.save();
    return res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ---------------- GET USER CART ----------------
export const getUserCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const userObjectId = new Types.ObjectId(req.userId);
    const cart = await Cart.findOne({ userId: userObjectId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ success: true, message: "Cart is empty", cart: { items: [] } });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ---------------- UPDATE ITEM QUANTITY ----------------
export const updateCartItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const { productId, quantity } = req.body;
    const qty = Number(quantity);
    if (!productId || qty <= 0)
      return res.status(400).json({ message: "Invalid productId or quantity" });

    const userObjectId = new Types.ObjectId(req.userId);
    const cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = qty;
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ---------------- REMOVE ITEM FROM CART ----------------
export const removeFromCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const { productId } = req.params;
    const userObjectId = new Types.ObjectId(req.userId);
    const cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    return res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.error("Remove cart item error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};

// ---------------- CLEAR CART ----------------
export const clearCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized" });

    const userObjectId = new Types.ObjectId(req.userId);
    const cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    return res.status(500).json({ success: false, message: "Server error", error });
  }
};
