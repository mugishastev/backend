import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
dotenv.config();

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
  throw new Error("Missing Cloudinary env vars: CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET");
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

export default cloudinary;
