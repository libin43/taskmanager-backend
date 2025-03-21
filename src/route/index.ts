import { Router } from "express"
import userRouter from "./userRouter"
import taskRouter from "./taskRouter"
import authRouter from "./authRouter"


export const indexRouter = Router()

indexRouter.use('/auth', authRouter)

indexRouter.use('/users', userRouter)

indexRouter.use('/tasks', taskRouter)