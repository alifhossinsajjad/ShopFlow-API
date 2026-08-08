import { Request, Response, NextFunction } from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error:", err);

    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages: any[] = [];

    if (err.name === 'ZodError') {
        statusCode = 400;
        message = "Validation Error";
        errorMessages = err.issues.map((issue: any) => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));
    } else if (err.code === '23505') { // PostgreSQL unique constraint violation
        statusCode = 409;
        message = "Duplicate Entry";
        errorMessages = [{ message: err.detail }];
    } else if (err instanceof Error) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default globalErrorHandler;
