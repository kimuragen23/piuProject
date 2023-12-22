import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import Order from "../entities/order.entity";

export class SuccessOrderDto extends Order{

    @IsString()
    expired_date: string;

    @IsNumber()
    product_price: number;

    @IsString()
    product_name: string;

    @IsNumber()
    product_count: number;

    
    
}
