import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class ReadProductDto {
    @IsNotEmpty()
    @IsNumber()
    product_id: number;

    @IsNotEmpty()
    @IsString()
    product_name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    inventory: number;

    @IsNotEmpty()
    @IsBoolean()
    isSoldout: Boolean;
}
