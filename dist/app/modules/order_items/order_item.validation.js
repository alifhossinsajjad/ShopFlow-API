"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderItemValidationSchema = exports.createOrderItemValidationSchema = void 0;
const zod_1 = require("zod");
exports.createOrderItemValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        order_id: zod_1.z.number({ message: "Order ID is required" }).int().positive(),
        product_id: zod_1.z.number({ message: "Product ID is required" }).int().positive(),
        quantity: zod_1.z.number({ message: "Quantity is required" }).int().positive(),
        price: zod_1.z.number({ message: "Price is required" }).positive(),
    }),
});
exports.updateOrderItemValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantity: zod_1.z.number().int().positive().optional(),
        price: zod_1.z.number().positive().optional(),
    }),
});
