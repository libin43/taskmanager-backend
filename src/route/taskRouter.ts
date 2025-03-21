import { Router } from "express";
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from "../controller/taskController";
import { accessControl } from "../middleware/accessControl";


const taskRouter = Router()

taskRouter.post('/', accessControl, createTask)
taskRouter.get('/', accessControl, getAllTask)
taskRouter.get('/:id', accessControl, getTaskById)
taskRouter.put('/:id', accessControl, updateTask)
taskRouter.delete('/:id', accessControl, deleteTask)


export default taskRouter

