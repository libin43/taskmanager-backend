import { Request } from "express";
import { UserRole } from "../dto/user/createUser.dto";  // Adjust the path as needed

export interface UserRequest extends Request {
    user: {
        _id: string;
        role: UserRole;
    };
}
