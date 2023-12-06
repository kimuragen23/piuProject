import { Module } from '@nestjs/common';
import { AccountinfoService } from './accountinfo.service';
import { AccountinfoController } from './accountinfo.controller';
import { Accountinfo } from './entities/accountinfo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Accountinfo])],
  controllers: [AccountinfoController],
  providers: [AccountinfoService],
})
export class AccountinfoModule { }
