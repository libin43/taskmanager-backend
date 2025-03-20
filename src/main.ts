import express, { Application, NextFunction, Request, Response } from 'express'
import { indexRouter } from './route'
import connectDB from './db/mongodb/connection'
import { errorHandler } from './utils/errorHandler'

const app: Application = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

// Connect to MongoDB
connectDB()

app.get("/", (req: Request, res: Response) => {
    res.json("Hello World!")
})

app.use('/api/v1', indexRouter())

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     const message = err.message
//     let statusCode = 500
//     let errorCode =  "INTERNAL_SERVER_ERROR"

//     res.status(statusCode).json({
//         success: false,
//         message: err.message || "Internal Server Error",
//         errorCode
//     });
// })

app.use(errorHandler)

const port: number = 7000

app.listen((port), ()=> {
    console.log(`server listening on PORT: ${port}`)
})