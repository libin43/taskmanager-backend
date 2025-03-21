import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class CreateTaskInput {
    @IsString()
    @IsNotEmpty({ message: "Title is required" })
    @Length(1, 30, { message: "Title must be between 1 and 30 characters" })
    title!: string;

    @IsOptional()
    @IsString()
    @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
    description?: string;
}
