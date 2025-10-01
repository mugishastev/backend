"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controllers/paymentController");
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const paymentRouter = express_1.default.Router();
// Process payment for an order
paymentRouter.post("/process", authenitacationFunction_1.requireSignin, paymentController_1.processPayment);
exports.default = paymentRouter;
//# sourceMappingURL=paymentRoutes.js.map