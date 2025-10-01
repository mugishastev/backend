import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  // This file may be unused, but ensure strict typing passes if it is referenced
  // Prefer using src/utils/cloudhandles.ts with CLOUD_* vars
  throw new Error("Missing Cloudinary env vars: CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET");
}

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default cloudinary;
