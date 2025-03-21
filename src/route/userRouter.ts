import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { createUser, resetPassword } from "../controller/userController";
import { accessControl } from "../middleware/accessControl";


const userRouter = Router()

userRouter.post('/', createUser)
userRouter.post('/reset_password', accessControl, resetPassword)

export default userRouter