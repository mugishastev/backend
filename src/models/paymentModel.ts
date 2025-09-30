import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  orderId: string;
  amount: number;
  method: string;
  status: "Pending" | "Completed" | "Failed";
}

const PaymentSchema: Schema = new Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  method: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
}, { timestamps: true });

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
