import express from "express";
import { requireSignin, checkAdmin } from "../middlewares/authenitacationFunction";
import upload from "../utils/multer";
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/productController";

const productRouter = express.Router();

// ----------------- CREATE PRODUCT -----------------
productRouter.post("/create", requireSignin, checkAdmin, upload.single("image"), createProduct);
// ----------------- GET ALL PRODUCTS -----------------
productRouter.get("/all", getAllProducts);
productRouter.put("/update/:id", requireSignin, checkAdmin, upload.single("image"), updateProduct);
productRouter.delete("/delete/:id", requireSignin, checkAdmin, deleteProduct);
productRouter.get("/search", searchProducts);
productRouter.get("/:id", getProduct);




export default productRouter;
// router.post("/create", upload.single("image"), createProduct);
// router.get("/all", getAllProducts);
// router.get("/search", searchProducts);
// router.get("/:id", getProduct);
// router.put("/update/:id", upload.single("image"), updateProduct);
// router.delete("/delete/:id", deleteProduct);