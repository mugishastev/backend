import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string | Types.ObjectId;
        email?: string;
        userRole?: string;
        accessToken?: string;
      };
      userId?: string | Types.ObjectId;
    }
  }
}
