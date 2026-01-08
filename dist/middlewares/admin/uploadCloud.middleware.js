"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingle = void 0;
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY ?? process.env.API_KEY,
    api_secret: process.env.CLOUD_SECRET ?? process.env.API_SECRET,
});
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
const uploadToCloudinary = async (buffer) => {
    const result = await streamUpload(buffer);
    return result.secure_url ?? result.url;
};
const uploadSingle = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }
        const result = await uploadToCloudinary(req.file.buffer);
        req.body[req.file.fieldname] = result;
    }
    catch (error) {
        return next(error);
    }
    next();
};
exports.uploadSingle = uploadSingle;
