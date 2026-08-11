import { Router } from "express";
import * as UserController from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { createUserValidationSchema, updateUserValidationSchema } from "./user.validation";

const router = Router();

router.get("/", auth("admin"), UserController.getAllUsers);
router.get("/:id", auth("admin", "user"), UserController.getUserById);
router.post("/", validateRequest(createUserValidationSchema), UserController.createUser);
router.put("/:id", auth("admin", "user"), validateRequest(updateUserValidationSchema), UserController.updateUser);
router.delete("/:id", auth("admin"), UserController.deleteUser);

export default router;
