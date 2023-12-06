import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountinfoDto } from './create-accountinfo.dto';

export class UpdateAccountinfoDto extends PartialType(CreateAccountinfoDto) {}
