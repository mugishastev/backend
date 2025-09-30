import mongoose, { Document, Schema, Types } from "mongoose";
import { CartItem } from "./cartModel";

export interface OrderDocument extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
}

const orderSchema = new Schema<OrderDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" }, quantity: Number }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
}, { timestamps: true });

export const Order = mongoose.model<OrderDocument>("Order", orderSchema);
