import { Router } from "express";
import * as UserController from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidationSchema, updateUserValidationSchema } from "./user.validation";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", validateRequest(createUserValidationSchema), UserController.createUser);
router.put("/:id", validateRequest(updateUserValidationSchema), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
