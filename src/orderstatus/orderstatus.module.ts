import { Module } from '@nestjs/common';
import { OrderstatusService } from './orderstatus.service';
import { OrderstatusController } from './orderstatus.controller';

@Module({
  controllers: [OrderstatusController],
  providers: [OrderstatusService],
})
export class OrderstatusModule {}
