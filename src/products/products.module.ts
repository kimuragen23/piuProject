import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/brands/entities/brand.entity';
import { Productcode } from 'src/productcode/entities/productcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Productcode])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
