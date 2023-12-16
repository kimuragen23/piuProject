import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsString, ValidateNested } from "class-validator";
import Order from "../entities/order.entity";

export class SuccessOrderDto extends Order{

    @IsString()
    expired_date: string;
    
    
}
