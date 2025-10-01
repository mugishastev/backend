"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const cartRoutes_1 = __importDefault(require("./cartRoutes"));
const userPath_1 = __importDefault(require("./userPath"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const statsRoute_1 = __importDefault(require("./statsRoute"));
const contactRouter_1 = __importDefault(require("./contactRouter"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const mainRouter = (0, express_1.Router)();
// mainRouter.use('/products', productsRouter);
mainRouter.use("/users", userPath_1.default);
mainRouter.use("/orders", orderRoutes_1.default);
mainRouter.use('/cart', cartRoutes_1.default);
mainRouter.use('/products', productRoutes_1.default);
mainRouter.use("/stats", statsRoute_1.default); // Importing statsRoute
mainRouter.use("/send-email", contactRouter_1.default);
mainRouter.use("/blogs", blogRouter_1.default);
exports.default = mainRouter;
//# sourceMappingURL=indexRouting.js.map