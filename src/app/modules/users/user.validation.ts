import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }).min(2, "Name must be at least 2 characters"),
    email: z.string({ message: "Email is required" }).email("Invalid email format"),
    age: z.number().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    age: z.number().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});
