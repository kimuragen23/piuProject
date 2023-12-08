import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsString, ValidateNested } from "class-validator";

export class ReadOrderDto {

    @IsString()
    cust_name: string;

    @IsString()
    order_code: string;

    @IsString()
    cust_pwd: string;
}

// {
// "cust_name": [입금자명],
// "order_code": [주문번호],
// "cust_pwd": [주문비밀번호]
// }