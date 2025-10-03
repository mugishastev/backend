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

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - prodName
 *               - prodPrice
 *               - prodQty
 *               - image
 *             properties:
 *               prodName:
 *                 type: string
 *                 description: Product name
 *               prodDesc:
 *                 type: string
 *                 description: Product description
 *               prodPrice:
 *                 type: number
 *                 minimum: 0
 *                 description: Product price
 *               prodQty:
 *                 type: number
 *                 minimum: 0
 *                 description: Product quantity
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Product image file
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: No image uploaded or validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */
productRouter.post("/create", requireSignin, checkAdmin, upload.single("image"), createProduct);

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security: []
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
productRouter.get("/all", getAllProducts);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products by name or description
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term for product name or description
 *     responses:
 *       200:
 *         description: Products found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
productRouter.get("/search", searchProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               prodName:
 *                 type: string
 *               prodDesc:
 *                 type: string
 *               prodPrice:
 *                 type: number
 *                 minimum: 0
 *               prodQty:
 *                 type: number
 *                 minimum: 0
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */
productRouter.get("/:id", getProduct);
productRouter.put("/update/:id", requireSignin, checkAdmin, upload.single("image"), updateProduct);
productRouter.delete("/delete/:id", requireSignin, checkAdmin, deleteProduct);




export default productRouter;
// router.post("/create", upload.single("image"), createProduct);
// router.get("/all", getAllProducts);
// router.get("/search", searchProducts);
// router.get("/:id", getProduct);
// router.put("/update/:id", upload.single("image"), updateProduct);
// router.delete("/delete/:id", deleteProduct);