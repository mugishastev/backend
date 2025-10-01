import express from "express";
import { processPayment } from "../controllers/paymentController";
import { requireSignin } from "../middlewares/authenitacationFunction";

const paymentRouter = express.Router();

// Process payment for an order
paymentRouter.post("/process", requireSignin, processPayment);

export default paymentRouter;
