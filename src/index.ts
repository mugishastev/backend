import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import mainRouter from "./routes/indexRouting";

const app = express();

const PORT = process.env.PORT || 3000; 

// const corsOptions = {
//     origin: ["http://localhost:5173", "http://localhost:3000"], 
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
// };

app.use(cors()
);
app.use(express.json());

app.use("/api", mainRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
