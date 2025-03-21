import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express"
import { CreateTaskInput } from "../dto/task/createTask.dto";
import { AppError } from "../utils/errorHandler";
import { TaskModel } from "../db/mongodb/model/taskModel";
import { UserRequest } from "../types/userRequestType";
import { UpdateTaskInput } from "../dto/task/updateTask.dto";
import mongoose from "mongoose";


export const createTask = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const taskData = plainToInstance(CreateTaskInput, req.body)
        const validationResult = await validate(taskData);
        if (validationResult.length > 0) {
            const formattedErrors = validationResult.map(res => ({
                property: res.property,
                messages: Object.values(res.constraints || {})
            }));

            throw new AppError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors);
        }
        const userRequest = req as UserRequest
        console.log(userRequest.user._id, 'user id')
        const userId = userRequest.user._id

        console.log(taskData, 'its task data')

        const data = await TaskModel.create({
            title: taskData.title,
            description: taskData.description,
            userId: userId
        })
        res.status(201).json({ message: 'Task created.', success: true, data })
    } catch (error) {
        console.error(error, 'error')
        next(error)
    }

}

export const getAllTask = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const userRequest = req as UserRequest
        console.log(userRequest.user._id, 'user id')
        const userId = userRequest.user._id
        console.log(userId, 'its user id')

        const data = await TaskModel.find({
            userId: userId
        }).select("_id title status")
        console.log(data, 'all data')
        res.status(200).json({ message: 'Tasks successfuly fetched.', success: true, data })
    } catch (error) {
        next(error)
    }
}

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const taskId = req.params.id
        const userRequest = req as UserRequest
        console.log(userRequest.user._id, 'user id')
        const userId = userRequest.user._id
        console.log(taskId,'taks id')

        const data = await TaskModel.findOne({
            _id: taskId,
            userId: userId
        })

        if(!data){
            throw new AppError("Task not found.", 404, "NOT_FOUND")
       }
        res.status(200).json({ message: 'Task successfuly fetched.', success: true, data })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const taskId = req.params.id

        const taskData = plainToInstance(UpdateTaskInput, req.body)
        const validationResult = await validate(taskData);
        if (validationResult.length > 0) {
            const formattedErrors = validationResult.map(res => ({
                property: res.property,
                messages: Object.values(res.constraints || {})
            }));

            throw new AppError("Validation failed", 400, "VALIDATION_ERROR", formattedErrors);
        }

        console.log(taskData, 'task data');
        
    
        const userRequest = req as UserRequest
        console.log(userRequest.user._id, 'user id')
        const userId = userRequest.user._id

        const task = await TaskModel.findOne({
            _id: taskId,
            userId: userId
        }).select("_id")

        if(!task){
            throw new AppError("Task not found.", 404, "NOT_FOUND")
       }
       

        const data = await TaskModel.updateOne(
            {
            _id: taskId,
            userId: userId
        },
        {
            $set: {
                ...(taskData.title && {title: taskData.title}),
                description: taskData.description,
                status: taskData.status,
            },
        },
        {
            new: true
        }
    )
        res.status(201).json({ message: 'Task successfuly updated.', success: true, data })
    } catch (error) {
        next(error)
    }
}


export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const taskId = req.params.id
    
        const userRequest = req as UserRequest
        console.log(userRequest.user._id, 'user id')
        const userId = userRequest.user._id

        const task = await TaskModel.findOne({
            _id: taskId,
            userId: userId
        }).select("_id")

        if(!task){
            throw new AppError("Task not found.", 404, "NOT_FOUND")
       }

        const data = await TaskModel.deleteOne(
            {
            _id: taskId,
            userId: userId
        },

    )
        res.status(201).json({ message: 'Task successfuly deleted.', success: true, data })
    } catch (error) {
        next(error)
    }
}


