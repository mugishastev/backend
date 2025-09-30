import { Router } from "express";
import { 
  register, 
  login, 
  getAllUsers, 
  requestPasswordReset, 
  resetPasswordWithOTP 
} from "../controllers/userController";
import { requireSignin, checkAdmin } from "../middlewares/authenitacationFunction";

const userRouter = Router();

// Auth routes
userRouter.post("/register", register);
userRouter.post("/login", login);

// Password reset routes
userRouter.post("/request-reset", requestPasswordReset); // Step 1: Send OTP
userRouter.post("/reset-password", resetPasswordWithOTP); // Step 2: Reset password

// Admin route
userRouter.get("/", requireSignin, checkAdmin, getAllUsers);

export default userRouter;
