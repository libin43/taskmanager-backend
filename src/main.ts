import express, { Application, NextFunction, Request, Response } from 'express'
import { indexRouter } from './route'
import connectDB from './db/mongodb/connection'
import { errorHandler } from './utils/errorHandler'
import cors from 'cors'

const app: Application = express()

const corsOptions={
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended: false}))

// Connect to MongoDB
connectDB()

app.get("/", (req: Request, res: Response) => {
    res.json("Hello World!")
})

app.use('/api/v1', indexRouter)

app.use(errorHandler)

const port: number = 7000

app.listen((port), ()=> {
    console.log(`server listening on PORT: ${port}`)
})