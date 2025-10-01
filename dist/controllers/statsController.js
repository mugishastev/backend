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
exports.getStats = void 0;
const orderModel_1 = require("../models/orderModel");
const userModel_1 = require("../models/userModel"); // if you have a User model
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Total Sales
        const orders = yield orderModel_1.Order.find();
        const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        // Total Orders
        const totalOrders = orders.length;
        // Products Sold
        const productsSold = orders.reduce((sum, order) => sum + order.products.reduce((s, p) => s + p.quantity, 0), 0);
        // New Customers Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const newCustomers = yield userModel_1.User.countDocuments({ createdAt: { $gte: today } });
        res.status(200).json({
            totalSales,
            totalOrders,
            productsSold,
            newCustomers,
        });
    }
    catch (error) {
        console.error("Stats fetch error:", error);
        res.status(500).json({ message: "Error fetching stats", error });
    }
});
exports.getStats = getStats;
//# sourceMappingURL=statsController.js.map