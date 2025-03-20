import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config() // Load environment variables from .env
const JWT_SECRET = process.env.JWT_SECRET as string

export const jwtService = {
    generateToken: async(payload: {_id: string, lname: string, fname: string, role: string}) => {
        console.log(payload, 'its the payload')
        return jwt.sign({payload}, JWT_SECRET, {expiresIn: '5m'})
    },

    verifyToken: async(token: string) => {
        return jwt.verify(token, JWT_SECRET)
    }
}