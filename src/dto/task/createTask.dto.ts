import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateTaskInput {
    @IsString()
    @IsNotEmpty({ message: "Title is required" })
    @Length(1, 100, { message: "Title must be between 1 and 100 characters" })
    title!: string;


}
