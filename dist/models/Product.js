"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    prodName: { type: String, required: true },
    prodDesc: { type: String },
    prodPrice: { type: Number, required: true },
    prodQty: { type: Number, required: true, default: 1 },
    image: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
//# sourceMappingURL=Product.js.map