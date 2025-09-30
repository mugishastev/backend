import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController";
import { requireSignin, validateCartInput } from "../middlewares/authenitacationFunction";

const cartRouter = express.Router();

// Add item to cart
cartRouter.post("/add", requireSignin, validateCartInput, addToCart);

// Get current user's cart
cartRouter.get("/my-cart", requireSignin, getUserCart);

// Update quantity of a specific item
cartRouter.put("/update", requireSignin, validateCartInput, updateCartItem);

// Remove single item from cart
cartRouter.delete("/remove/:productId", requireSignin, removeFromCart);

// Clear entire cart
cartRouter.delete("/clear", requireSignin, clearCart);

export default cartRouter;
