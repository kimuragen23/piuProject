import { IsString } from "class-validator";

export class AddressDto {
    @IsString()
    zipCode: string;

    @IsString()
    fullAddress: string;

    @IsString()
    extraAddress: string;

    @IsString()
    detailAddress: string;
}