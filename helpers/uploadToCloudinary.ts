import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config();
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY ?? process.env.API_KEY,
  api_secret: process.env.CLOUD_SECRET ?? process.env.API_SECRET,
});

// Extend Express Request type to include file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[] | Record<string, Express.Multer.File[]>;
}

const streamUpload = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const uploadToCloudinary = async (buffer: Buffer): Promise<string> => {
  const result: UploadApiResponse = await streamUpload(buffer);
  return result.secure_url ?? result.url;
};

export default uploadToCloudinary;
