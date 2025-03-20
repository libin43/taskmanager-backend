import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";

export const validateRequest = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = Object.assign(new dtoClass(), req.body);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            return res.status(400).json({ errors }); // ✅ Return here to stop execution
        }
        
        next(); // ✅ Continue if validation passes
    };
};
