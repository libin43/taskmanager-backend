import { Router } from "express";
import { createTask } from "../controller/taskController";
import { accessControl } from "../middleware/accessControl";


const taskRouter = Router()

taskRouter.post('/', accessControl, createTask)

export default taskRouter

