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
exports.updateOrderStatus = exports.getUserOrders = exports.createOrder = void 0;
const orderModel_1 = require("../models/orderModel");
const cartModel_1 = require("../models/cartModel");
const Product_1 = require("../models/Product");
// Create order from cart
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: "User not logged in" });
    try {
        const cart = yield cartModel_1.Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        // Calculate total
        let totalAmount = 0;
        for (const item of cart.items) {
            const product = yield Product_1.Product.findById(item.productId);
            if (!product)
                continue;
            totalAmount += product.prodPrice * item.quantity;
        }
        const order = new orderModel_1.Order({
            userId,
            items: cart.items,
            totalAmount,
            status: "pending",
            paymentStatus: "pending",
        });
        yield order.save();
        // Optionally clear cart after order creation
        yield cartModel_1.Cart.findOneAndDelete({ userId });
        res.status(201).json({ success: true, message: "Order created", order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createOrder = createOrder;
// Get all orders of user
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const orders = yield orderModel_1.Order.find({ userId }).populate("items.productId");
        res.json({ success: true, orders });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getUserOrders = getUserOrders;
// Update order status (admin only)
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { status } = req.body;
    const paramId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const orderId = (_b = req.body.orderId) !== null && _b !== void 0 ? _b : paramId;
    try {
        const order = yield orderModel_1.Order.findById(orderId);
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        if (!status)
            return res.status(400).json({ message: "Status is required" });
        order.status = status;
        yield order.save();
        res.json({ success: true, message: "Order updated", order });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=orderController.js.map