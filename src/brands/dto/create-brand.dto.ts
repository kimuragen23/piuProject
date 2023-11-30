import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateBrandDto {
    @IsString()
    brand_name: string;
}
