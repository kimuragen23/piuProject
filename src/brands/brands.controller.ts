import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Post()
  create(@Body() createBrandDto: CreateBrandDto): Promise<CreateBrandDto> {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Get(':brand_id')
  findOne(@Param('brand_id') brand_id: string): Promise<Brand> {
    return this.brandsService.findOne(+brand_id);
  }

  @Patch(':brand_id')
  update(@Param('brand_id') brand_id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+brand_id, updateBrandDto);
  }

  @Delete(':brand_id')
  remove(@Param('brand_id') brand_id: string) {
    return this.brandsService.remove(+brand_id);
  }
}
