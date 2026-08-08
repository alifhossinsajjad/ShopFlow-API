import { z } from "zod";

export const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: "Category name is required" }),
    description: z.string().optional(),
  }),
});

export const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});
