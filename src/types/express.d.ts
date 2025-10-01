import { Request } from "express";
import { Types } from "mongoose";

export interface AuthenticatedRequest extends Request {
  userId?: string | Types.ObjectId;
  user?: {
    _id: string | Types.ObjectId;
    email?: string;
    userRole?: string;
    accessToken?: string;
  };
}
