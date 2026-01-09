import { Request, Response, NextFunction } from "express";
import uploadToCloudinary from "../../helpers/uploadToCloudinary";

export const uploadSingle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      return next();
    }

    const result = await uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = result;
  } catch (error) {
    return next(error);
  }

  next();
};

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.files) {
    return next();
  }

  const filesByField = req.files as Record<string, Express.Multer.File[]>;
  console.log(filesByField);
  for (const key of Object.keys(filesByField)) {
    const files = filesByField[key];

    // Khởi tạo giá trị cho từng field
    if (files.length <= 1) {
      req.body[key] = "";
    } else {
      req.body[key] = [];
    }

    for (const file of files) {
      try {
        const result = await uploadToCloudinary(file.buffer);
        if (Array.isArray(req.body[key])) {
          req.body[key].push(result);
        } else {
          req.body[key] = result;
        }
      } catch (error) {
        return next(error);
      }
    }
  }

  next();
};
