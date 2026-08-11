import { Request, Response, NextFunction } from "express";
import * as OrderService from "./order.service";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await OrderService.getOrderById(Number(req.params.id));
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    const reqUser = (req as any).user;
    if (reqUser.role !== "admin" && order.user_id !== reqUser.id) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden access" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqUser = (req as any).user;
    req.body.user_id = reqUser.id; // Enforce user_id from token

    const newOrder = await OrderService.createOrder(req.body);
    res
      .status(201)
      .json({
        success: true,
        data: newOrder,
        message: "Order created successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedOrder = await OrderService.updateOrder(
      Number(req.params.id),
      req.body,
    );
    if (!updatedOrder)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res
      .status(200)
      .json({
        success: true,
        data: updatedOrder,
        message: "Order updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isDeleted = await OrderService.deleteOrder(Number(req.params.id));
    if (!isDeleted)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};
