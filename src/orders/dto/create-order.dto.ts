import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsObject, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";
import { ProductInfoDto } from "./productinfo.dto";

export class CreateOrderDto {

    @IsString()
    cust_name: string;

    @IsString()
    phone_number: string;

    @IsString()
    email: string;

    @IsString()
    cust_pwd: string;

    @IsObject()
    @ValidateNested() @Type(() => AddressDto)
    address: AddressDto

    @IsArray()
    @ValidateNested() @Type(() => ProductInfoDto)
    product_info: ProductInfoDto

    @IsBoolean()
    agree: boolean;

    @IsString()
    depositor_name: string;

    @IsDate()
    create_date: Date;

}

// {
//     "name": [이름],
//     "email": [string@aaa.com],
//     "phone_number":[000-0000-0000],
//     "pwd":[주문자비밀번호],
//     "address":{
//             "zipCode": [우편번호],
//             "full": [주소],
//             "detail": [상세주소],
//     },
//     "products_info":[
//             {
//                     productId: [상품Id],
//                     count: [갯수]
//             },
//     ],
//     "payment_method": [무통장 입금],
//     "depositor_name": [입금자명],
//     "depository_bank": [입금은행],
//     "agree":[bool]
// }