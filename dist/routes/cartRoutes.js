"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const cartRouter = express_1.default.Router();
// Add item to cart
cartRouter.post("/add", authenitacationFunction_1.requireSignin, authenitacationFunction_1.validateCartInput, cartController_1.addToCart);
// Get current user's cart
cartRouter.get("/my-cart", authenitacationFunction_1.requireSignin, cartController_1.getUserCart);
// Update quantity of a specific item
cartRouter.put("/update", authenitacationFunction_1.requireSignin, authenitacationFunction_1.validateCartInput, cartController_1.updateCartItem);
// Remove single item from cart
cartRouter.delete("/remove/:productId", authenitacationFunction_1.requireSignin, cartController_1.removeFromCart);
// Clear entire cart
cartRouter.delete("/clear", authenitacationFunction_1.requireSignin, cartController_1.clearCart);
exports.default = cartRouter;
//# sourceMappingURL=cartRoutes.js.map