import { Schema, model, Document } from "mongoose";

export interface ProductDocument extends Document {
  prodName: string;
  prodDesc: string;
  prodPrice: number;
  prodQty: number;
  image: string;
  createdBy: string;
}

const ProductSchema = new Schema<ProductDocument>({
  prodName: { type: String, required: true },
  prodDesc: { type: String },
  prodPrice: { type: Number, required: true },
  prodQty: { type: Number, required: true, default: 1 },
  image: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Product = model<ProductDocument>("Product", ProductSchema);
