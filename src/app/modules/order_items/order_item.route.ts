import { Router } from "express";
import * as OrderItemController from "./order_item.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createOrderItemValidationSchema, updateOrderItemValidationSchema } from "./order_item.validation";

const router = Router();

router.get("/", OrderItemController.getAllOrderItems);
router.get("/:id", OrderItemController.getOrderItemById);
router.post("/", validateRequest(createOrderItemValidationSchema), OrderItemController.createOrderItem);
router.put("/:id", validateRequest(updateOrderItemValidationSchema), OrderItemController.updateOrderItem);
router.delete("/:id", OrderItemController.deleteOrderItem);

export default router;
