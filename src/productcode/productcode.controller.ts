import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductcodeService } from './productcode.service';
import { CreateProductcodeDto } from './dto/create-productcode.dto';
import { UpdateProductcodeDto } from './dto/update-productcode.dto';

@Controller('productcode')
export class ProductcodeController {
  constructor(private readonly productcodeService: ProductcodeService) { }

  @Post()
  create(@Body() createProductcodeDto: CreateProductcodeDto) {
    return this.productcodeService.create(createProductcodeDto);
  }

  @Get()
  findAll() {
    return this.productcodeService.findAll();
  }

  @Get(':productcode_id')
  findOne(@Param('productcode_id') productcode_id: string) {
    return this.productcodeService.findOne(+productcode_id);
  }

  @Patch(':productcode_id')
  update(@Param('productcode_id') productcode_id: string, @Body() updateProductcodeDto: UpdateProductcodeDto) {
    return this.productcodeService.update(+productcode_id, updateProductcodeDto);
  }

  @Delete(':productcode_id')
  remove(@Param('productcode_id') productcode_id: string) {
    return this.productcodeService.remove(+productcode_id);
  }
}
