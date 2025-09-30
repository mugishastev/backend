import { Request } from "express";
import { Types } from "mongoose";
import { UserDocument } from "../models/userModel"; // your Mongoose User interface

export interface AuthenticatedRequest extends Request {
  userId?: string | Types.ObjectId;
  user?: UserDocument;
}
