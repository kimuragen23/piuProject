import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateProductcodeDto {
    @IsString()
    product_code: string;
}