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

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  create(@Body() cat: CatEntity): Promise<CatEntity> {
    return this.catsService.create(cat);
  }

  @Patch(':id')
  patch(@Param('id') catId: number, @Body() cat: CatEntity): Promise<number> {
    return this.catsService.update(catId, cat);
  }

  @Get()
  getAll(): Promise<CatEntity[]> {
    return this.catsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') catId: number): Promise<CatEntity> {
    return this.catsService.getOne(catId);
  }

  @Delete(':id')
  remove(@Param('id') catId: number): Promise<number> {
    return this.catsService.remove(catId);
  }


}
