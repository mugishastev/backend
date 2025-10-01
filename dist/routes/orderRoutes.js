"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const orderRouter = express_1.default.Router();
// Routes
orderRouter.post("/createorder", authenitacationFunction_1.requireSignin, orderController_1.createOrder); // Create order
orderRouter.get("/getorder", authenitacationFunction_1.requireSignin, orderController_1.getUserOrders); // Get all orders of logged-in user
// Admin-only routes
orderRouter.put("/:id/status", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin, orderController_1.updateOrderStatus); // Update order status
// (Optional) add deleteOrder or getOrderById if you implement them
exports.default = orderRouter;
//# sourceMappingURL=orderRoutes.js.map