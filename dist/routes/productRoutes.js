"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const multer_1 = __importDefault(require("../utils/multer"));
const productController_1 = require("../controllers/productController");
const productRouter = express_1.default.Router();
// ----------------- CREATE PRODUCT -----------------
productRouter.post("/create", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin, multer_1.default.single("image"), productController_1.createProduct);
// ----------------- GET ALL PRODUCTS -----------------
productRouter.get("/all", productController_1.getAllProducts);
productRouter.put("/update/:id", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin, multer_1.default.single("image"), productController_1.updateProduct);
productRouter.delete("/delete/:id", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin, productController_1.deleteProduct);
productRouter.get("/search", productController_1.searchProducts);
productRouter.get("/:id", productController_1.getProduct);
exports.default = productRouter;
// router.post("/create", upload.single("image"), createProduct);
// router.get("/all", getAllProducts);
// router.get("/search", searchProducts);
// router.get("/:id", getProduct);
// router.put("/update/:id", upload.single("image"), updateProduct);
// router.delete("/delete/:id", deleteProduct);
//# sourceMappingURL=productRoutes.js.map