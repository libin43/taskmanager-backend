import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { createUser } from "../controller/userController";
import { login, registerUser } from "../controller/authController";


const authRouter = Router()

authRouter.post('/signup', registerUser)
authRouter.post('/login', login)

export default authRouter