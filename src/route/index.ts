import { Router } from "express"
import { userRouter } from "./userRouter"
import taskRouter from "./taskRouter"
// import { taskRouter } from "./taskRouter"

// export const indexRouter = (): Router => {

//     const router = Router()

//     userRouter(router)
//     taskRouter(router)


    

//     return router
// }

export const indexRouter = Router()

indexRouter.use("/users", userRouter)

indexRouter.use('/tasks', taskRouter)