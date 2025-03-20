import { NextFunction, Request, Response } from "express"
import userModel from "../db/mongodb/model/userModel"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { CreateUserInput } from "../dto/user/createUser.dto"
import { AppError } from "../utils/errorHandler"
import { bcryptService } from "../service/hash/hash.service"


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log(req.body)

        const userData = plainToInstance(CreateUserInput, req.body)
        const validationResult = await validate(userData);
        if (validationResult.length > 0) {
            const formattedErrors = validationResult.map(res => ({
                property: res.property,
                messages: Object.values(res.constraints || {})
            }));

            throw new AppError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors);
        }

        console.log(userData,'its user data')

        const hashPass = await bcryptService.generateHash(userData.password)

        if(!hashPass){
            throw new Error('')
        }
        
        const data = await userModel.create({
            fname: userData.fname,
            lname: userData.lname,
            mobile: userData.mobile,
            email: userData.email,
            role: userData.role,
            password: hashPass,
        })
        res.status(201).json({ message: 'User created.', success: true, data })
    } catch (error: any) {
        console.error(error, 'error')
        next(error)
        
    }
}