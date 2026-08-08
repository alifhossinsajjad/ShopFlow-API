import { Router } from "express";
import * as ProductController from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createProductValidationSchema, updateProductValidationSchema } from "./product.validation";

const router = Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", validateRequest(createProductValidationSchema), ProductController.createProduct);
router.put("/:id", validateRequest(updateProductValidationSchema), ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
