import { Router } from "express"
import { userRouter } from "./userRouter"

export const indexRouter = (): Router => {

    const router = Router()

    userRouter(router)

    return router
}