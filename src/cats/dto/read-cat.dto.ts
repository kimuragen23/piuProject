import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class ReadCatDto {
    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsOptional()
    @IsDate()
    updatedAt: Date;
}