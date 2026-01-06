"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSlug = void 0;
const unidecode_plus_1 = __importDefault(require("unidecode-plus"));
const convertToSlug = (text) => {
    const unidecodeText = (0, unidecode_plus_1.default)(text.trim());
    const slug = unidecodeText.replace(/\s+/g, "-");
    console.log("slug", slug);
    console.log("unidecodeText", unidecodeText);
    return slug;
};
exports.convertToSlug = convertToSlug;
