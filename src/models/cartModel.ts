import { Schema, model, Types, Document } from "mongoose";

export interface CartItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface CartDocument extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema<CartDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

export const Cart = model<CartDocument>("Cart", cartSchema);
