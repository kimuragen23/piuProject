import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './entities/order.entity';
import { Accountinfo } from 'src/accountinfo/entities/accountinfo.entity';
import { Orderstatus } from 'src/orderstatus/entities/orderstatus.entity';
import { Orderdetail } from 'src/orderdetail/entities/orderdetail.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Accountinfo, Orderstatus, Orderdetail, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
