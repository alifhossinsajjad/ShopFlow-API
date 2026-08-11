"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidationSchema = exports.forgetPasswordValidationSchema = exports.loginValidationSchema = void 0;
const zod_1 = require("zod");
exports.loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            message: "Email is required",
        })
            .email("Invalid email address"),
        password: zod_1.z
            .string({
            message: "Password is required",
        })
            .min(6, "Password must be at least 6 characters"),
    }),
});
exports.forgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            message: "Email is required",
        })
            .email("Invalid email address"),
    }),
});
exports.resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        token: zod_1.z.string({
            message: "Token is required",
        }),
        newPassword: zod_1.z
            .string({
            message: "New password is required",
        })
            .min(6, "Password must be at least 6 characters"),
    }),
});
