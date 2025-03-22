import { IsEmail, IsString, Length, Matches } from "class-validator";

export class LoginInputDto {
    // @IsString()
    // // @Length(10, 10, { message: "Mobile number must be exactly 10 digits" })
    // // @Matches(/^\d+$/, { message: "Mobile must contain only numbers" })
    // mobile!: string;

    @IsEmail({}, { message: "Invalid email format" })
    email!: string;

    @IsString()
    password!: string;
}
