import { IsNumber, IsString } from "class-validator";

export class ProductInfoDto {

    @IsNumber()
    product_id: number;

    @IsNumber()
    orderproduct_count: number;
}