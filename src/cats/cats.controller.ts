import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatEntity } from './entities/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  create(@Body() cat: CreateCatDto): Promise<CreateCatDto> {
    return this.catsService.create(cat);
  }

  @Patch(':id')
  patch(@Param('id') catId: number, @Body() cat: UpdateCatDto): Promise<CatEntity> {
    return this.catsService.update(catId, cat);
  }

  @Get()
  getAll(): Promise<CatEntity[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') catId: number): Promise<CatEntity> {
    return this.catsService.findOne(catId);
  }

  @Delete(':id')
  remove(@Param('id') catId: number): Promise<number> {
    return this.catsService.remove(catId);
  }


}
