import { Router } from "express";
import * as ProductController from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { createProductValidationSchema, updateProductValidationSchema } from "./product.validation";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", auth("admin"), validateRequest(createProductValidationSchema), ProductController.createProduct);
router.put("/:id", auth("admin"), validateRequest(updateProductValidationSchema), ProductController.updateProduct);
router.delete("/:id", auth("admin"), ProductController.deleteProduct);

export default router;
