import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: "Name is required" }).min(2, "Name must be at least 2 characters"),
    email: z.string({ message: "Email is required" }).email("Invalid email format"),
    password: z.string({ message: "Password is required" }).min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "manager", "admin"]).optional().default("user"),
    age: z.number().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    role: z.enum(["user", "manager", "admin"]).optional(),
    age: z.number().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});
