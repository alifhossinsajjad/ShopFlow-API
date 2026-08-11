"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "Name is required" }).min(2, "Name must be at least 2 characters"),
        email: zod_1.z.string({ message: "Email is required" }).email("Invalid email format"),
        password: zod_1.z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters"),
        role: zod_1.z.enum(["user", "manager", "admin"]).optional().default("user"),
        age: zod_1.z.number().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        email: zod_1.z.string().email().optional(),
        role: zod_1.z.enum(["user", "manager", "admin"]).optional(),
        age: zod_1.z.number().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
    }),
});
