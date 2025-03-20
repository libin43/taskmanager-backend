import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { createUser } from "../controller/userController";


const userRouter = Router()

userRouter.post('/auth/signup', createUser)

export default userRouter