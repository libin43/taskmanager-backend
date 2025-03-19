import express, { Application, NextFunction, Request, Response } from 'express'

const app: Application = express()

app.use(express.json())

app.use(express.urlencoded({extended: false}))



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const message = err.message
    let statusCode = 500
    let errorCode =  "INTERNAL_SERVER_ERROR"

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errorCode
    });
})

const port: number = 7000

app.listen((port), ()=> {
    console.log(`server listening on PORT: ${port}`)
})