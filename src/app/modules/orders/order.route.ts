import { Router } from "express";
import * as OrderController from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createOrderValidationSchema, updateOrderValidationSchema } from "./order.validation";

const router = Router();

router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/", validateRequest(createOrderValidationSchema), OrderController.createOrder);
router.put("/:id", validateRequest(updateOrderValidationSchema), OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

export default router;
