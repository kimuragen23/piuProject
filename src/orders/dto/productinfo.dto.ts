import { IsString } from "class-validator";

export class ProductInfoDto {
    @IsString()
    order_code: string;

    @IsString()
    product_id: number;

    @IsString()
    orderproduct_count: number;
}