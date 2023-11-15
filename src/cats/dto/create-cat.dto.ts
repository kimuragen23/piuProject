import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCatDto {
    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsOptional()
    @IsDate()
    createdAt: Date;
}