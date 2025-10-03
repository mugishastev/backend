"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables first
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const indexRouting_1 = __importDefault(require("./routes/indexRouting"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// const corsOptions = {
//     origin: ["http://localhost:5173", "http://localhost:3000"], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
// };
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check for Render and uptime monitors
app.get("/", (_req, res) => {
    res.status(200).send("ok");
});
// Swagger Documentation
app.use("/api-docs", swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'KapeePro API Documentation',
}));
// API routes
app.use("/api", indexRouting_1.default);
(0, db_1.default)();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map