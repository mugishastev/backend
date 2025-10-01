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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCartInput = exports.checkAdmin = exports.requireSignin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "supersecretkey123";
/**
 * 🔑 Middleware to require user signin
 * - Verifies JWT token
 * - Attaches user + userId to req
 */
const requireSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 🔍 Debugging: see if header is received
    console.log("Authorization Header:", req.headers.authorization);
    console.log("JWT_SECRET in middleware:", process.env.JWT_SECRET);
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Find user in DB
        const rootuser = yield userModel_1.User.findOne({
            _id: decoded._id,
            accessToken: token,
        });
        if (!rootuser) {
            return res.status(401).json({ message: "User not found" });
        }
        // Attach user to request
        req.user = rootuser;
        req.userId = rootuser._id;
        next();
    }
    catch (error) {
        console.error("RequireSignin error:", error); // 🔍 Log token errors
        return res.status(401).json({ message: "Authorization required" });
    }
});
exports.requireSignin = requireSignin;
/**
 * 🔑 Middleware to check if user is admin
 */
const checkAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.userRole) !== "admin") {
        return res.status(403).json({ message: "User not authorized" });
    }
    next();
};
exports.checkAdmin = checkAdmin;
/**
 * 🛒 Middleware to validate cart input
 */
const validateCartInput = (req, res, next) => {
    const { productId, quantity } = req.body;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be greater than 0" });
    }
    next();
};
exports.validateCartInput = validateCartInput;
//# sourceMappingURL=authenitacationFunction.js.map