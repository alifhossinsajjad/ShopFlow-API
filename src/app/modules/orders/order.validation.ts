import { z } from "zod";

export const createOrderValidationSchema = z.object({
  body: z.object({
    user_id: z.number({ message: "User ID is required" }).int().positive(),
    total_amount: z.number({ message: "Total amount is required" }).positive(),
    status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional(),
  }),
});

export const updateOrderValidationSchema = z.object({
  body: z.object({
    total_amount: z.number().positive().optional(),
    status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional(),
  }),
});
