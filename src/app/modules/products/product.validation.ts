import { z } from "zod";

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: "Product name is required" }),
    description: z.string().optional(),
    price: z.number({ message: "Price is required" }).positive("Price must be a positive number"),
    stock: z.number({ message: "Stock is required" }).int().nonnegative("Stock cannot be negative"),
    category_id: z.number({ message: "Category ID is required" }).int().positive(),
  }),
});

export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    category_id: z.number().int().positive().optional(),
  }),
});
