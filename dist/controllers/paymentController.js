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
exports.processPayment = void 0;
const orderModel_1 = require("../models/orderModel");
const processPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { orderId, paymentMethod } = req.body;
    if (!userId)
        return res.status(401).json({ message: "User not logged in" });
    try {
        const order = yield orderModel_1.Order.findById(orderId);
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        // Simulate payment success
        order.paymentStatus = "paid";
        order.status = "completed";
        yield order.save();
        res.json({ success: true, message: "Payment successful", order });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.processPayment = processPayment;
//# sourceMappingURL=paymentController.js.map