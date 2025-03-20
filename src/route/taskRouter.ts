import { Router } from "express";
import { createTask } from "../controller/taskController";


const taskRouter = Router()

taskRouter.post('/', createTask)

export default taskRouter

