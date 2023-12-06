import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderstatusService } from './orderstatus.service';
import { CreateOrderstatusDto } from './dto/create-orderstatus.dto';
import { UpdateOrderstatusDto } from './dto/update-orderstatus.dto';

@Controller('orderstatus')
export class OrderstatusController {
  constructor(private readonly orderstatusService: OrderstatusService) { }
}
