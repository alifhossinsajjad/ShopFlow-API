import { Router } from "express";
import * as CategoryController from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createCategoryValidationSchema, updateCategoryValidationSchema } from "./category.validation";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/:id", CategoryController.getCategoryById);
router.post("/", validateRequest(createCategoryValidationSchema), CategoryController.createCategory);
router.put("/:id", validateRequest(updateCategoryValidationSchema), CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
