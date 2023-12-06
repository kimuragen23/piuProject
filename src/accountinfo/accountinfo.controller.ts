import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountinfoService } from './accountinfo.service';
import { CreateAccountinfoDto } from './dto/create-accountinfo.dto';
import { UpdateAccountinfoDto } from './dto/update-accountinfo.dto';
import { Accountinfo } from './entities/accountinfo.entity';

@Controller('accountinfo')
export class AccountinfoController {
  constructor(private readonly accountinfoService: AccountinfoService) { }

  @Get()
  find(): Promise<Accountinfo> {
    return this.accountinfoService.find();
  }
}
