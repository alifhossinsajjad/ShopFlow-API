import { Router } from "express";
import * as AuthController from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  loginValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
} from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthController.login
);

router.post(
  "/forget-password",
  validateRequest(forgetPasswordValidationSchema),
  AuthController.forgetPassword
);

router.post(
  "/reset-password",
  validateRequest(resetPasswordValidationSchema),
  AuthController.resetPassword
);

export default router;
