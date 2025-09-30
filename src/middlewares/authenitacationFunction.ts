import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET ?? "supersecretkey123";

/**
 * 🔑 Middleware to require user signin
 * - Verifies JWT token
 * - Attaches user + userId to req
 */
export const requireSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const decoded = jwt.verify(token, JWT_SECRET) as {
      _id: string;
      email?: string;
      userRole?: string;
    };

    // Find user in DB
    const rootuser = await User.findOne({
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
  } catch (error) {
    console.error("RequireSignin error:", error); // 🔍 Log token errors
    return res.status(401).json({ message: "Authorization required" });
  }
};

/**
 * 🔑 Middleware to check if user is admin
 */
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.userRole !== "admin") {
    return res.status(403).json({ message: "User not authorized" });
  }
  next();
};

/**
 * 🛒 Middleware to validate cart input
 */
export const validateCartInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  next();
};
