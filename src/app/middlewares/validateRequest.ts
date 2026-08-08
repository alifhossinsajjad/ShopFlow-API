import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

const validateRequest = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies,
        });
        return next();
    } catch (error) {
        next(error);
    }
};

export default validateRequest;
