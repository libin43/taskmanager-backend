import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { createUser } from "../controller/userController";
import { login } from "../controller/authController";


const authRouter = Router()

authRouter.post('/login', login)

export default authRouter