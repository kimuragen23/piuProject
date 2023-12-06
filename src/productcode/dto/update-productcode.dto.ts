import { PartialType } from '@nestjs/mapped-types';
import { CreateProductcodeDto } from './create-productcode.dto';

export class UpdateProductcodeDto extends PartialType(CreateProductcodeDto) {}
