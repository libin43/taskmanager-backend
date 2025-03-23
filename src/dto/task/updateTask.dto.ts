import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, NotEquals, ValidateIf } from "class-validator";

export class UpdateTaskInput {
    @IsString()
    // @IsNotEmpty({ message: "Title is required" })
      @Transform(({ value }) => value?.trim())
    @NotEquals(null)
    @ValidateIf((object, value) => value !== undefined)
    @Length(1, 30, { message: "Title must be between 1 and 30 characters" })
    title!: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    @Length(0, 100, { message: "Description must be atmost 100 characters" })
    description?: string;

    @IsOptional()
    @IsEnum(["PENDING", "ONGOING", "COMPLETED"], { message: "Status must be PENDING, ONGOING, or COMPLETED" })
    status?: "PENDING" | "ONGOING" | "COMPLETED";
}
