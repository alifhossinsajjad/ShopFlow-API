import { Router } from "express";
import * as OrderItemController from "./order_item.controller";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { createOrderItemValidationSchema, updateOrderItemValidationSchema } from "./order_item.validation";

const router = Router();

router.get("/", auth("admin"), OrderItemController.getAllOrderItems);
router.get("/:id", auth("admin"), OrderItemController.getOrderItemById);
router.post("/", auth("admin"), validateRequest(createOrderItemValidationSchema), OrderItemController.createOrderItem);
router.put("/:id", auth("admin"), validateRequest(updateOrderItemValidationSchema), OrderItemController.updateOrderItem);
router.delete("/:id", auth("admin"), OrderItemController.deleteOrderItem);

export default router;
