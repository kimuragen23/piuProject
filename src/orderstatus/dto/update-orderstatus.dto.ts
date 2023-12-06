import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderstatusDto } from './create-orderstatus.dto';

export class UpdateOrderstatusDto extends PartialType(CreateOrderstatusDto) {}
