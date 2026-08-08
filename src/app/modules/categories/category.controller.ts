import { Request, Response, NextFunction } from "express";
import * as CategoryService from "./category.service";

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.getCategoryById(Number(req.params.id));
        if (!category) return res.status(404).json({ success: false, message: "Category not found" });
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCategory = await CategoryService.createCategory(req.body);
        res.status(201).json({ success: true, data: newCategory, message: "Category created successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedCategory = await CategoryService.updateCategory(Number(req.params.id), req.body);
        if (!updatedCategory) return res.status(404).json({ success: false, message: "Category not found" });
        res.status(200).json({ success: true, data: updatedCategory, message: "Category updated successfully" });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await CategoryService.deleteCategory(Number(req.params.id));
        if (!isDeleted) return res.status(404).json({ success: false, message: "Category not found" });
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};
