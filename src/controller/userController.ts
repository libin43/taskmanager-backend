import { NextFunction, Request, Response } from "express"
import userModel from "../db/mongodb/model/userModel"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { CreateUserInput } from "../dto/user/createUser.dto"
import { AppError } from "../utils/errorHandler"
import { bcryptService } from "../service/hash/hash.service"
import { PasswordResetInput } from "../dto/user/passwordReset.dto"
import { UserRequest } from "../types/userRequestType"


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
        res.status(201).json({ message: 'User created.', success: true, data })
    } catch (error: any) {
        console.error(error, 'error')
        next(error)

    }
}


export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const passwordData = plainToInstance(PasswordResetInput, req.body)
        const validationResult = await validate(passwordData);
        if (validationResult.length > 0) {
            const formattedErrors = validationResult.map(res => ({
                property: res.property,
                messages: Object.values(res.constraints || {})
            }));

            throw new AppError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors)

        }

        const userRequest = req as UserRequest
        console.log(userRequest.user._id, 'user id')
        const userId = userRequest.user._id

        const userData = await userModel.findById({
            _id: userId
        }).select("password")

        if (!userData) {
            throw new AppError("User not found.", 404, "NOT_FOUND")
        }
        const isSamePassword = await bcryptService.compareHashedValue(passwordData.password, userData.password)
        if (isSamePassword) {
            throw new AppError('New password cannot be the same as the old password.', 400, 'PASSWORD_SAME_AS_OLD')
        }

        const hashPass = await bcryptService.generateHash(passwordData.password)
        if (!hashPass) {
            throw new AppError('"Failed to hash password. Please try again.", 500, "PASSWORD_HASHING_FAILED"')
        }

        const data = await userModel.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                $set: {
                    password: hashPass
                }
            },
            {
                new: true
            }
        ).select("fname lname")

        res.status(200).json({ success: true, message: "User password reset successfully.", data })

    } catch (error) {
        next(error)
    }
}