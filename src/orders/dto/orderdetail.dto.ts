import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";
import { ProductInfoDto } from "./productinfo.dto";

export class OrderDetailDto {

    @IsString()
    cust_name: string;

    @IsString()
    email: string;

    @IsString()
    phone_number: string;

    @IsString()
    cust_post: string;

    @IsString()
    depositor_name: string;

    @IsString()
    orderstatus: string;

    @IsString()
    account_name: string;

    @IsString()
    account_number: string;

    @IsString()
    account_bank: string;

    @IsString()
    product_count: number;

    @IsString()
    product_name: string;

    @IsString()
    product_price: number;

    @IsObject()
    @ValidateNested() @Type(() => AddressDto)
    address: AddressDto
}

// {
// "cust_name": [입금자명],
// "order_code": [주문번호],
// "cust_pwd": [주문비밀번호]
// }