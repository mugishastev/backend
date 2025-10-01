"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authenitacationFunction_1 = require("../middlewares/authenitacationFunction");
const userRouter = (0, express_1.Router)();
// Auth routes
userRouter.post("/register", userController_1.register);
userRouter.post("/login", userController_1.login);
// Password reset routes
userRouter.post("/request-reset", userController_1.requestPasswordReset); // Step 1: Send OTP
userRouter.post("/reset-password", userController_1.resetPasswordWithOTP); // Step 2: Reset password
// Admin route
userRouter.get("/", authenitacationFunction_1.requireSignin, authenitacationFunction_1.checkAdmin);
exports.default = userRouter;
//# sourceMappingURL=userPath.js.map