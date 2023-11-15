import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCatDto {
    @IsString()
    name: string;

    @IsNumber()
    age: number;
}