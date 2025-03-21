import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express"
import { CreateTaskInput } from "../dto/task/createTask.dto";
import { AppError } from "../utils/errorHandler";
import { TaskModel } from "../db/mongodb/model/taskModel";
import { UserRequest } from "../types/userRequestType";


export const createTask = async (req: Request, res: Response, next: NextFunction) => {

   try{
    const taskData = plainToInstance(CreateTaskInput, req.body)
    const userRequest = req as UserRequest
    console.log(userRequest.user._id,'user id')
    const userId = userRequest.user._id
    const validationResult = await validate(taskData);
    if (validationResult.length > 0) {
        const formattedErrors = validationResult.map(res => ({
            property: res.property,
            messages: Object.values(res.constraints || {})
        }));

        throw new AppError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors);
    }

    console.log(taskData, 'its task data')

    const data = await TaskModel.create({
        title: taskData.title,
        userId: userId 
    })
    res.status(201).json({ message: 'User created.', success: true, data })
   } catch(error){
    console.error(error, 'error')
    next(error)
   }

}

