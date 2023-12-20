import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { promises } from 'dns';
import Order from './entities/order.entity';
import { ReadOrderDto } from './dto/read-order.dto';
import { OrderDetailDto } from './dto/orderdetail.dto';
import { SuccessOrderDto } from './dto/success-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<SuccessOrderDto> {
    return this.ordersService.create(createOrderDto);
  }


  @Post('detail')
  findOne(@Body() readOrderDto: ReadOrderDto): Promise<OrderDetailDto> {
    return this.ordersService.findOne(readOrderDto);
  }

  @Post('dpstPrcsn')
  dpstPrcsn(@Body() readOrderDto: ReadOrderDto): Promise<String> {
    return this.ordersService.dpstPrcsn(readOrderDto);
  }
}
