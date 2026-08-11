"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderValidationSchema = exports.createOrderValidationSchema = void 0;
const zod_1 = require("zod");
exports.createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user_id: zod_1.z.number({ message: "User ID is required" }).int().positive(),
        total_amount: zod_1.z.number({ message: "Total amount is required" }).positive(),
        status: zod_1.z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional(),
    }),
});
exports.updateOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        total_amount: zod_1.z.number().positive().optional(),
        status: zod_1.z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional(),
    }),
});
