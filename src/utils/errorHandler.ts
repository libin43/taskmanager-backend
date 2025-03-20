import { Request, Response, NextFunction } from "express";
import { ValidationError } from "class-validator"; 
import { MongooseError } from "mongoose";

// Custom Error Class
export class AppError extends Error {
    public statusCode: number
    public errorCode: string
    public errors?: any

    constructor(message: string, statusCode = 500, errorCode = "INTERNAL_SERVER_ERROR", errors?: any) {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
        this.errors = errors
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

// Global Error Handler Middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err, 'error got in error handler'); // Log the error for debugging

    let statusCode = 500
    let errorCode = "INTERNAL_SERVER_ERROR"
    let message = err.message || "Internal Server Error"
    let errors = null

    // Handle AppError (Custom Errors)
    if (err instanceof AppError) {
        statusCode = err.statusCode
        errorCode = err.errorCode
        message = err.message
        errors = err.errors || null
    }

    // Handle Validation Errors from class-validator
    if (Array.isArray(err) && err[0] instanceof ValidationError) {
        console.log(err, 'error is in validation error')
        statusCode = 400;
        errorCode = "VALIDATION_ERROR"
        errors = err.map((e) => ({
            property: e.property,
            constraints: e.constraints,
        }));
        message = "Validation failed."
    }

    if(err instanceof MongooseError){
        console.log('error is in mongoose error')
    }

    if ((err as any).code === 11000) {
        statusCode = 409;
        errorCode = "DUPLICATE_ENTRY";
        message = `Duplicate value found for: ${Object.keys((err as any).keyValue).join(", ")}`;
    }

    

    res.status(statusCode).json({
        success: false,
        message,
        errorCode,
        errors: errors
    });
};
