"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordWithOTP = exports.requestPasswordReset = exports.getAllUsers = exports.login = exports.register = void 0;
const userModel_1 = require("../models/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenGenetion_1 = require("../utils/tokenGenetion");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const generateOTP_1 = require("../utils/generateOTP");
// ---------------- REGISTER ----------------
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, userRole } = req.body;
        const existingUser = yield userModel_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new userModel_1.User({ username, email, password: hashedPassword, userRole });
        const token = (0, tokenGenetion_1.generateAccessToken)(newUser);
        newUser.accessToken = token;
        yield newUser.save();
        return res.status(201).json({ message: "User registered successfully", token, user: newUser });
    }
    catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ message: "Error registering user", error });
    }
});
exports.register = register;
// ---------------- LOGIN ----------------
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield userModel_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found, please register" });
        }
        const isPasswordMatched = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = (0, tokenGenetion_1.generateAccessToken)(existingUser);
        existingUser.accessToken = token;
        yield existingUser.save();
        return res.status(200).json({ message: "User logged in successfully", token, user: existingUser });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Error logging in", error });
    }
});
exports.login = login;
// ---------------- GET ALL USERS ----------------
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find();
        return res.status(200).json({ message: "Users fetched successfully", users });
    }
    catch (error) {
        console.error("GetAllUsers error:", error);
        return res.status(500).json({ message: "Error fetching users", error });
    }
});
exports.getAllUsers = getAllUsers;
// ---------------- REQUEST PASSWORD RESET (send OTP) ----------------
const requestPasswordReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({ message: "Email is required" });
        const user = yield userModel_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const otp = (0, generateOTP_1.generateOTP)();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        user.resetPasswordOTP = otp;
        user.otpExpiry = otpExpiry;
        yield user.save();
        // Send OTP via email
        yield (0, sendEmail_1.default)(email, "Password Reset OTP", `
        <h3>Hello ${user.username},</h3>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This code expires in 10 minutes.</p>
      `);
        return res.status(200).json({ message: "OTP sent to your email" });
    }
    catch (error) {
        const err = error;
        console.error("RequestPasswordReset error:", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});
exports.requestPasswordReset = requestPasswordReset;
// ---------------- RESET PASSWORD USING OTP ----------------
const resetPasswordWithOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword)
            return res.status(400).json({ message: "All fields are required" });
        const user = yield userModel_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        if (!user.resetPasswordOTP ||
            user.resetPasswordOTP !== otp ||
            !user.otpExpiry ||
            user.otpExpiry < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(newPassword, salt);
        user.resetPasswordOTP = undefined;
        user.otpExpiry = undefined;
        yield user.save();
        return res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        const err = error;
        console.error("ResetPasswordWithOTP error:", err.message);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});
exports.resetPasswordWithOTP = resetPasswordWithOTP;
//# sourceMappingURL=userController.js.map