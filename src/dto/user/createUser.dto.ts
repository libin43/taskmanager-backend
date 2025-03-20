import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches, MinLength } from "class-validator";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

export class CreateUserInput {
    @IsString()
    @MinLength(2, { message: "First name must be at least 2 characters" })
    fname!: string;

    @IsString()
    @MinLength(2, { message: "Last name must be at least 2 characters" })
    lname!: string;

    @IsString()
    @Length(10, 10, { message: "Mobile number must be 10 digits" })
    @Matches(/^\d+$/, { message: "Mobile must contain only numbers" })
    mobile!: string;

    @IsEmail({}, { message: "Invalid email format" })
    email!: string;

    @IsString()
    @MinLength(6, { message: "Password must be at least 6 characters" })
    password!: string;

    @IsEnum(UserRole, { message: "Invalid role, must be USER or ADMIN" })
    role!: UserRole;
}
