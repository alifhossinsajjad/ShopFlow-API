import { Request, Response, NextFunction } from "express";
import * as ProductService from "./product.service";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await ProductService.getProductById(Number(req.params.id));
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct = await ProductService.createProduct(req.body);
        res.status(201).json({ success: true, data: newProduct, message: "Product created successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedProduct = await ProductService.updateProduct(Number(req.params.id), req.body);
        if (!updatedProduct) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: updatedProduct, message: "Product updated successfully" });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await ProductService.deleteProduct(Number(req.params.id));
        if (!isDeleted) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};
