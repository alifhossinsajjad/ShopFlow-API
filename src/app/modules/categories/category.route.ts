import { Router } from "express";
import * as CategoryController from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { createCategoryValidationSchema, updateCategoryValidationSchema } from "./category.validation";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", auth("admin"), validateRequest(createCategoryValidationSchema), CategoryController.createCategory);
router.put("/:id", auth("admin"), validateRequest(updateCategoryValidationSchema), CategoryController.updateCategory);
router.delete("/:id", auth("admin"), CategoryController.deleteCategory);

export default router;
