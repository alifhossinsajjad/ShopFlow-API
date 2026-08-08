import { z } from "zod";

export const createOrderItemValidationSchema = z.object({
  body: z.object({
    order_id: z.number({ message: "Order ID is required" }).int().positive(),
    product_id: z.number({ message: "Product ID is required" }).int().positive(),
    quantity: z.number({ message: "Quantity is required" }).int().positive(),
    price: z.number({ message: "Price is required" }).positive(),
  }),
});

export const updateOrderItemValidationSchema = z.object({
  body: z.object({
    quantity: z.number().int().positive().optional(),
    price: z.number().positive().optional(),
  }),
});
