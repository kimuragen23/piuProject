import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from 'src/orders/entities/order.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        ScheduleModule.forRoot()
    ],
    providers: [BatchService],
})
export class BatchModule { }
