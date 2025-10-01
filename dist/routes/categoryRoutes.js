"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const categoryRouter = express_1.default.Router();
// Public reads
categoryRouter.get("/", categoryController_1.getCategories);
categoryRouter.get("/:id", categoryController_1.getCategoryById);
// Admin writes
categoryRouter.post("/", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin, categoryController_1.createCategory);
categoryRouter.put("/:id", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin, categoryController_1.updateCategory);
categoryRouter.delete("/:id", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin, categoryController_1.deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categoryRoutes.js.map