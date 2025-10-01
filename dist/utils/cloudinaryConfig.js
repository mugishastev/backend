"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    // This file may be unused, but ensure strict typing passes if it is referenced
    // Prefer using src/utils/cloudhandles.ts with CLOUD_* vars
    throw new Error("Missing Cloudinary env vars: CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET");
}
cloudinary_1.v2.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinaryConfig.js.map