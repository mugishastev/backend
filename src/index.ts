import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import mainRouter from "./routes/indexRouting";
import { specs, swaggerUi } from "./config/swagger";

const app = express();

const PORT = process.env.PORT || 5000; 

// const corsOptions = {
//     origin: ["http://localhost:5173", "http://localhost:3000"], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
// };

app.use(cors()
);
app.use(express.json());

// Health check for Render and uptime monitors
app.get("/", (_req, res) => {
  res.status(200).send("ok");
});

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'KapeePro API Documentation',
}));

// API routes
app.use("/api", mainRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
