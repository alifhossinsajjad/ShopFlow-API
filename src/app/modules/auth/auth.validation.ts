import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: "Email is required",
      })
      .email("Invalid email address"),
    password: z
      .string({
        message: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
  }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: "Email is required",
      })
      .email("Invalid email address"),
  }),
});

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    token: z.string({
      message: "Token is required",
    }),
    newPassword: z
      .string({
        message: "New password is required",
      })
      .min(6, "Password must be at least 6 characters"),
  }),
});
