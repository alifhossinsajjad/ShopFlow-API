import { Request, Response, NextFunction } from "express";
import * as UserService from "./user.service";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqUser = (req as any).user;
    if (reqUser.role !== "admin" && reqUser.id !== Number(req.params.id)) {
      return res.status(403).json({ success: false, message: "Forbidden access" });
    }

    const user = await UserService.getUserById(Number(req.params.id));
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res
      .status(201)
      .json({
        success: true,
        data: newUser,
        message: "User created successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqUser = (req as any).user;
    if (reqUser.role !== "admin" && reqUser.id !== Number(req.params.id)) {
      return res.status(403).json({ success: false, message: "Forbidden access" });
    }

    const updatedUser = await UserService.updateUser(
      Number(req.params.id),
      req.body,
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        data: updatedUser,
        message: "User updated successfully",
      });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isDeleted = await UserService.deleteUser(Number(req.params.id));
    if (!isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
