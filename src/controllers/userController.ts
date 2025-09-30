import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import bcryptjs from "bcryptjs";
import { generateAccessToken } from "../utils/tokenGenetion";
import mailerSender from "../utils/sendEmail";
import { generateOTP } from "../utils/generateOTP";

// ---------------- REGISTER ----------------
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, userRole } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, userRole });

    const token = generateAccessToken(newUser);
    newUser.accessToken = token;
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Error registering user", error });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found, please register" });
    }

    const isPasswordMatched = await bcryptjs.compare(password, existingUser.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateAccessToken(existingUser);
    existingUser.accessToken = token;
    await existingUser.save();

    return res.status(200).json({ message: "User logged in successfully", token, user: existingUser });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Error logging in", error });
  }
};

// ---------------- GET ALL USERS ----------------
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("GetAllUsers error:", error);
    return res.status(500).json({ message: "Error fetching users", error });
  }
};

// ---------------- REQUEST PASSWORD RESET (send OTP) ----------------
export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.resetPasswordOTP = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via email
    await mailerSender(
      email,
      "Password Reset OTP",
      `
        <h3>Hello ${user.username},</h3>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This code expires in 10 minutes.</p>
      `
    );

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("RequestPasswordReset error:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ---------------- RESET PASSWORD USING OTP ----------------
export const resetPasswordWithOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      !user.resetPasswordOTP ||
      user.resetPasswordOTP !== otp ||
      !user.otpExpiry ||
      user.otpExpiry < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(newPassword, salt);

    user.resetPasswordOTP = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("ResetPasswordWithOTP error:", err.message);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
