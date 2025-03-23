import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class CreateTaskInput {
    @IsString()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: "Title is required" })
    @Length(1, 30, { message: "Title must be between 1 and 30 characters" })
    title!: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    @Length(0, 100, { message: "Description must be atmost 100 characters" })
    description?: string;
}
