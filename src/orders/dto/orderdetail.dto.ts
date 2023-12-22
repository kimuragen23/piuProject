import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";

export class OrderDetailDto {

    @IsString()
    order_code: string;

    @IsString()
    cust_name: string;

    @IsString()
    email: string;

    @IsString()
    phone_number: string;

    @IsString()
    zipCode: string;

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

    @IsNumber()
    product_count: number;

    @IsString()
    product_name: string;

    @IsNumber()
    product_price: number;

    @IsString()
    create_date: string;

    @IsString()
    expired_date: string;
    
    @IsObject()
    @ValidateNested() @Type(() => AddressDto)
    address: AddressDto
}

// {
// "cust_name": [입금자명],
// "order_code": [주문번호],
// "cust_pwd": [주문비밀번호]
// }