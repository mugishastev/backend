import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  userRole: "admin" | "user";
  accessToken?: string;

  resetPasswordOTP?: string | undefined;
  otpExpiry?: Date | undefined;
}


const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, enum: ["admin", "user"], default: "user" },
    accessToken: { type: String },

    // OTP for password reset
    resetPasswordOTP: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
