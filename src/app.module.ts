import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from './brands/brands.module';
import { Brand } from './brands/entities/brand.entity';
import { ConfigModule } from "@nestjs/config";
import { ProductcodeModule } from './productcode/productcode.module';
import { Productcode } from './productcode/entities/productcode.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { AccountinfoModule } from './accountinfo/accountinfo.module';
import { Accountinfo } from './accountinfo/entities/accountinfo.entity';
import { OrderstatusModule } from './orderstatus/orderstatus.module';
import { Orderstatus } from './orderstatus/entities/orderstatus.entity';
import { OrderdetailModule } from './orderdetail/orderdetail.module';
import Order from './orders/entities/order.entity';
import { Orderdetail } from './orderdetail/entities/orderdetail.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Brand, Productcode, Product, Accountinfo, Orderstatus, Order, Orderdetail],
      synchronize: true,
    }),
    BrandsModule,
    ProductcodeModule,
    ProductsModule,
    OrdersModule,
    AccountinfoModule,
    OrderstatusModule,
    OrderdetailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
