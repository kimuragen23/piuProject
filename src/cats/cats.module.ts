import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatEntity } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

//nest g resourse cats
@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule { }
