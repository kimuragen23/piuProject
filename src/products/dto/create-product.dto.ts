import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    product_name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    size: string;

    @IsNotEmpty()
    @IsNumber()
    inventory: number;

    @IsNotEmpty()
    @IsString()
    product_text: string;

    @IsString()
    image: string;

    @IsString()
    image_text: string;

    @IsNotEmpty()
    @IsString()
    product_title: string;

    @IsNotEmpty()
    @IsNumber()
    brand_id: number;

    @IsNotEmpty()
    @IsNumber()
    productcode_id: number;
}
