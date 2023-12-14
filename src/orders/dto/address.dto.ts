import { IsString } from "class-validator";

export class AddressDto {
    @IsString()
    zipCode: string;

    @IsString()
    fullAddress: string;

    @IsString()
    detailAddress: string;
}