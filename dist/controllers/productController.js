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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = require("../models/Product");
const cloudhandles_1 = __importDefault(require("../utils/cloudhandles"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { prodName, prodDesc, prodPrice, prodQty } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }
        // Upload image to Cloudinary
        const result = yield cloudhandles_1.default.uploader.upload(req.file.path, {
            folder: "products",
        });
        const imageUrl = result.secure_url;
        // Create product
        const newProduct = new Product_1.Product({
            prodName,
            prodDesc,
            prodPrice,
            prodQty,
            image: imageUrl,
            createdBy: req.user._id, // track which admin created it
        });
        const savedProduct = yield newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    }
    catch (error) {
        console.error("Create Product error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.Product.find();
        res.status(200).json({ message: "Products fetched successfully", products });
    }
    catch (error) {
        console.error("Get All Products error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getAllProducts = getAllProducts;
// / Get Single Product
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield Product_1.Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            message: "Product fetched successfully",
            product
        });
    }
    catch (error) {
        console.error("Get Product error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.getProduct = getProduct;
// Update Product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { prodName, prodDesc, prodPrice, prodQty } = req.body;
        // Find existing product
        const existingProduct = yield Product_1.Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        let imageUrl = existingProduct.image;
        // Upload new image if provided
        if (req.file) {
            try {
                // Delete old image from Cloudinary if it exists
                if (existingProduct.image) {
                    const publicId = (_a = existingProduct.image.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
                    if (publicId) {
                        yield cloudhandles_1.default.uploader.destroy(`products/${publicId}`);
                    }
                }
                // Upload new image
                const result = yield cloudhandles_1.default.uploader.upload(req.file.path, {
                    folder: "products",
                    resource_type: "auto"
                });
                imageUrl = result.secure_url;
                // Delete the temporary file
                // fs.unlinkSync(req.file.path);
            }
            catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({ message: "Image upload failed" });
            }
        }
        // Update product
        const updatedProduct = yield Product_1.Product.findByIdAndUpdate(id, {
            prodName: prodName || existingProduct.prodName,
            prodDesc: prodDesc !== undefined ? prodDesc : existingProduct.prodDesc,
            prodPrice: prodPrice ? parseFloat(prodPrice) : existingProduct.prodPrice,
            prodQty: prodQty ? parseInt(prodQty) : existingProduct.prodQty,
            image: imageUrl,
            updatedAt: new Date()
        }, { new: true, runValidators: true });
        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    }
    catch (error) {
        console.error("Update Product error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.updateProduct = updateProduct;
// Delete Product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        // Find the product to get image URL
        const product = yield Product_1.Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Delete image from Cloudinary if it exists
        if (product.image) {
            try {
                const publicId = (_a = product.image.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
                if (publicId) {
                    yield cloudhandles_1.default.uploader.destroy(`products/${publicId}`);
                }
            }
            catch (deleteError) {
                console.error("Cloudinary delete error:", deleteError);
                // Continue with product deletion even if image deletion fails
            }
        }
        // Delete product from database
        yield Product_1.Product.findByIdAndDelete(id);
        res.status(200).json({
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        console.error("Delete Product error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.deleteProduct = deleteProduct;
// Search Products
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }
        const products = yield Product_1.Product.find({
            $or: [
                { prodName: { $regex: query, $options: 'i' } },
                { prodDesc: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Products searched successfully",
            products
        });
    }
    catch (error) {
        console.error("Search Products error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.searchProducts = searchProducts;
//# sourceMappingURL=productController.js.map