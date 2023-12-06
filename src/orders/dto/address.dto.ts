import { IsString } from "class-validator";

export class AddressDto {
    @IsString()
    cust_post: string;

    @IsString()
    cust_address: string;

    @IsString()
    cust_detailaddress: string;
}