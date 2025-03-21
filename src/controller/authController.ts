import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { LoginInputDto } from "../dto/auth/loginInput.dto";
import { validate } from "class-validator";
import { AppError } from "../utils/errorHandler";
import userModel from "../db/mongodb/model/userModel";
import { CreateUserInput, UserRole } from "../dto/user/createUser.dto";
import { jwtService } from "../service/jwt/jwt.service";
import { bcryptService } from "../service/hash/hash.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginData = plainToInstance(LoginInputDto, req.body)
        const validationResult = await validate(loginData);
        if (validationResult.length > 0) {
            const formattedErrors = validationResult.map(res => ({
                property: res.property,
                messages: Object.values(res.constraints || {})
            }));

            throw new AppError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors)
        }
        console.log(loginData, 'its login data')

        const user = await userModel.findOne({
            mobile: loginData.mobile,
        }).select("fname lname role password") as { _id: string, fname: string, lname: string, role: UserRole, password: string }

        console.log(user, 'got the uer')

        if (!user) {
            throw new AppError("Invalid credentials. Please check your mobile number and password.", 401, "INVALID_CREDENTIALS");
        }

        const token = await jwtService.generateToken(user)

        const data = {
            fname: user.fname,
            lname: user.lname,
            role: user.role,
            accessToken: token
        }

        res.status(200).json({ success: true, message: "authentication success.", data })

    } catch (error) {
        next(error)
    }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = plainToInstance(CreateUserInput, req.body)
        const validationResult = await validate(userData);
        if (validationResult.length > 0) {
            const formattedErrors = validationResult.map(res => ({
                property: res.property,
                messages: Object.values(res.constraints || {})
            }));

            throw new AppError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors);
        }

        console.log(userData, 'its user data')

        const hashPass = await bcryptService.generateHash(userData.password)

        console.log(hashPass)

        if (!hashPass) {
            throw new AppError('"Failed to hash password. Please try again.", 500, "PASSWORD_HASHING_FAILED"')
        }

        const user = await userModel.create({
            fname: userData.fname,
            lname: userData.lname,
            mobile: userData.mobile,
            email: userData.email,
            role: userData.role,
            password: hashPass,
        })
        const data = {
            fname: user.fname,
            lname: user.lname,
            mobile: user.mobile,
        }
        res.status(201).json({ message: 'User registered successfully.', success: true, data })
    } catch (error: any) {
        console.error(error, 'error')
        next(error)
    }
}