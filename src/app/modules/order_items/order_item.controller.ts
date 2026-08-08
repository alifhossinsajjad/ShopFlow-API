import { Request, Response, NextFunction } from "express";
import * as OrderItemService from "./order_item.service";

export const getAllOrderItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderItems = await OrderItemService.getAllOrderItems();
        res.status(200).json({ success: true, data: orderItems });
    } catch (error) {
        next(error);
    }
};

export const getOrderItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderItem = await OrderItemService.getOrderItemById(Number(req.params.id));
        if (!orderItem) return res.status(404).json({ success: false, message: "Order Item not found" });
        res.status(200).json({ success: true, data: orderItem });
    } catch (error) {
        next(error);
    }
};

export const createOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newOrderItem = await OrderItemService.createOrderItem(req.body);
        res.status(201).json({ success: true, data: newOrderItem, message: "Order item created successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedOrderItem = await OrderItemService.updateOrderItem(Number(req.params.id), req.body);
        if (!updatedOrderItem) return res.status(404).json({ success: false, message: "Order Item not found" });
        res.status(200).json({ success: true, data: updatedOrderItem, message: "Order item updated successfully" });
    } catch (error) {
        next(error);
    }
};

export const deleteOrderItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await OrderItemService.deleteOrderItem(Number(req.params.id));
        if (!isDeleted) return res.status(404).json({ success: false, message: "Order Item not found" });
        res.status(200).json({ success: true, message: "Order item deleted successfully" });
    } catch (error) {
        next(error);
    }
};
