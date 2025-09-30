// models/commentModel.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  blogId: mongoose.Types.ObjectId;
  user: string;
  message: string;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
