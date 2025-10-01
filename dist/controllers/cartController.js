"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.getUserCart = exports.addToCart = void 0;
const mongoose_1 = require("mongoose");
const cartModel_1 = require("../models/cartModel");
// ---------------- ADD ITEM TO CART ----------------
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { productId, quantity } = req.body;
        const qty = Number(quantity);
        if (!productId || qty <= 0)
            return res.status(400).json({ message: "Invalid productId or quantity" });
        const userObjectId = new mongoose_1.Types.ObjectId(req.userId);
        let cart = yield cartModel_1.Cart.findOne({ userId: userObjectId });
        if (!cart)
            cart = new cartModel_1.Cart({ userId: userObjectId, items: [] });
        // Check if product exists in cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += qty;
        }
        else {
            cart.items.push({ productId: new mongoose_1.Types.ObjectId(productId), quantity: qty });
        }
        yield cart.save();
        return res.status(200).json({ success: true, message: "Item added to cart", cart });
    }
    catch (error) {
        console.error("Add to cart error:", error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.addToCart = addToCart;
// ---------------- GET USER CART ----------------
const getUserCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            return res.status(401).json({ message: "Unauthorized" });
        const userObjectId = new mongoose_1.Types.ObjectId(req.userId);
        const cart = yield cartModel_1.Cart.findOne({ userId: userObjectId }).populate("items.productId");
        if (!cart) {
            return res.status(200).json({ success: true, message: "Cart is empty", cart: { items: [] } });
        }
        return res.status(200).json({ success: true, cart });
    }
    catch (error) {
        console.error("Get cart error:", error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.getUserCart = getUserCart;
// ---------------- UPDATE ITEM QUANTITY ----------------
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { productId, quantity } = req.body;
        const qty = Number(quantity);
        if (!productId || qty <= 0)
            return res.status(400).json({ message: "Invalid productId or quantity" });
        const userObjectId = new mongoose_1.Types.ObjectId(req.userId);
        const cart = yield cartModel_1.Cart.findOne({ userId: userObjectId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item)
            return res.status(404).json({ message: "Product not in cart" });
        item.quantity = qty;
        yield cart.save();
        return res.status(200).json({ success: true, message: "Cart updated", cart });
    }
    catch (error) {
        console.error("Update cart error:", error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.updateCartItem = updateCartItem;
// ---------------- REMOVE ITEM FROM CART ----------------
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { productId } = req.params;
        const userObjectId = new mongoose_1.Types.ObjectId(req.userId);
        const cart = yield cartModel_1.Cart.findOne({ userId: userObjectId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        yield cart.save();
        return res.status(200).json({ success: true, message: "Item removed", cart });
    }
    catch (error) {
        console.error("Remove cart item error:", error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.removeFromCart = removeFromCart;
// ---------------- CLEAR CART ----------------
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId)
            return res.status(401).json({ message: "Unauthorized" });
        const userObjectId = new mongoose_1.Types.ObjectId(req.userId);
        const cart = yield cartModel_1.Cart.findOne({ userId: userObjectId });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        cart.items = [];
        yield cart.save();
        return res.status(200).json({ success: true, message: "Cart cleared", cart });
    }
    catch (error) {
        console.error("Clear cart error:", error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
});
exports.clearCart = clearCart;
//# sourceMappingURL=cartController.js.map