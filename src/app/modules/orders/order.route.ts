import { Router } from "express";
import * as OrderController from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { createOrderValidationSchema, updateOrderValidationSchema } from "./order.validation";

const router = Router();

router.get("/", auth("admin"), OrderController.getAllOrders);
router.get("/:id", auth("admin", "user"), OrderController.getOrderById);
router.post("/", auth("admin", "user"), validateRequest(createOrderValidationSchema), OrderController.createOrder);
router.put("/:id", auth("admin"), validateRequest(updateOrderValidationSchema), OrderController.updateOrder);
router.delete("/:id", auth("admin"), OrderController.deleteOrder);

export default router;
