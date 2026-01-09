"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFields = exports.uploadSingle = void 0;
const uploadToCloudinary_1 = __importDefault(require("../../helpers/uploadToCloudinary"));
const uploadSingle = async (req, res, next) => {
    try {
        if (!req.file) {
            return next();
        }
        const result = await (0, uploadToCloudinary_1.default)(req.file.buffer);
        req.body[req.file.fieldname] = result;
    }
    catch (error) {
        return next(error);
    }
    next();
};
exports.uploadSingle = uploadSingle;
const uploadFields = async (req, res, next) => {
    if (!req.files) {
        return next();
    }
    const filesByField = req.files;
    console.log(filesByField);
    for (const key of Object.keys(filesByField)) {
        const files = filesByField[key];
        // Khởi tạo giá trị cho từng field
        if (files.length <= 1) {
            req.body[key] = "";
        }
        else {
            req.body[key] = [];
        }
        for (const file of files) {
            try {
                const result = await (0, uploadToCloudinary_1.default)(file.buffer);
                if (Array.isArray(req.body[key])) {
                    req.body[key].push(result);
                }
                else {
                    req.body[key] = result;
                }
            }
            catch (error) {
                return next(error);
            }
        }
    }
    next();
};
exports.uploadFields = uploadFields;
