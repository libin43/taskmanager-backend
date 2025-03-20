import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { userController } from "../controller/userController";

export const userRouter= (router: Router) => {

    const {
        createUser
    } = userController()

    // router.route('/auth/signup').post((req: Request, res: Response) => {
    //     console.log(req.body, 'req body')

    // })

    router.route('/auth/signup').post(createUser)

    router.route('/hello').get((req: Request, res: Response)=> {
        res.status(200).json({data: "Hello user from server"})
    })
}