import { IsString } from "class-validator";

export class ProductInfoDto {

    @IsString()
    product_id: number;

    @IsString()
    orderproduct_count: number;
}