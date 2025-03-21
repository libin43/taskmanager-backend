import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errorHandler";
import { jwtService } from "../service/jwt/jwt.service";
import { UserRole } from "../dto/user/createUser.dto";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { UserRequest } from "../types/userRequestType";

export const accessControl = async(req: Request, res: Response, next: NextFunction) => {
    try{

        const authHeader = req.headers.authorization
        if(!authHeader){
            throw new AppError("Missing authentication token", 401, "TOKEN_MISSING")
        }

        const token = authHeader.split('Bearer ')[1]
        console.log(token)



        const decodedToken = await jwtService.verifyToken(token)
        // if(!isTokenVerifySuccess){
        //     throw new AppError("Invalid token", 401, "TOKEN_INVALID")
        if (!decodedToken || typeof decodedToken !== "object" || !("payload" in decodedToken)) {
            throw new JsonWebTokenError("Invalid token structure");
        }

        // ✅ Extract payload safely
        const userPayload = (decodedToken as { payload: UserRequest["user"] }).payload;

        if (!userPayload || !userPayload._id) {
            throw new JsonWebTokenError("Invalid token: Missing user ID");
        }

        (req as UserRequest).user = userPayload; 
        next()
    } catch(error) {

        next(error)
    }
}