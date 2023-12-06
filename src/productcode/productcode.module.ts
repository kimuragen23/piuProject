import { Module } from '@nestjs/common';
import { ProductcodeService } from './productcode.service';
import { ProductcodeController } from './productcode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productcode } from './entities/productcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productcode])],
  controllers: [ProductcodeController],
  providers: [ProductcodeService],
})
export class ProductcodeModule { }
