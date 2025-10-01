import express from "express";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController";
import { requireSignin, checkAdmin } from "../middlewares/authenitacationFunction";

const categoryRouter = express.Router();

// Public reads
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);

// Admin writes
categoryRouter.post("/", requireSignin, checkAdmin, createCategory);
categoryRouter.put("/:id", requireSignin, checkAdmin, updateCategory);
categoryRouter.delete("/:id", requireSignin, checkAdmin, deleteCategory);

export default categoryRouter;
