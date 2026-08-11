"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
exports.createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "Product name is required" }),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number({ message: "Price is required" }).positive("Price must be a positive number"),
        stock: zod_1.z.number({ message: "Stock is required" }).int().nonnegative("Stock cannot be negative"),
        category_id: zod_1.z.number({ message: "Category ID is required" }).int().positive(),
    }),
});
exports.updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().positive().optional(),
        stock: zod_1.z.number().int().nonnegative().optional(),
        category_id: zod_1.z.number().int().positive().optional(),
    }),
});
