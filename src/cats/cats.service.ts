import { Injectable, NotFoundException } from '@nestjs/common';
import { CatEntity } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CreateCatDto } from './dto/create-cat.dto';
import { error } from 'console';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(CatEntity)
  private catsRepository: Repository<CatEntity>) { }


  async create(cat: CreateCatDto): Promise<CreateCatDto> {
    try {
      return await this.catsRepository.save(cat);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<CatEntity[]> {
    try {
      return this.catsRepository.find();
    } catch (error) {
      throw error
    }

  }

  async findOne(id: number): Promise<CatEntity> {
    try {
      return await this.catsRepository.findOne({
        where: {
          id
        }
      });
    } catch (error) {
      throw error
    }
  }


  async update(id: number, updateCat: UpdateCatDto): Promise<CatEntity> {
    try {
      const cat = await this.catsRepository.findOne({
        where: {
          id
        }
      });
      if (!cat) {
        throw new EntityNotFoundError(CatEntity, id);
      }
      const result = await this.catsRepository.save({
        ...cat,
        ...updateCat,
      });
      return result;
    } catch (error) {
      throw error
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const cat = await this.catsRepository.findOne({
        where: {
          id
        }
      });
      if (!cat) {
        throw new EntityNotFoundError(CatEntity, id);
      }
      await this.catsRepository.softDelete({
        id: cat.id,
      });
      return cat.id;
    } catch (error) {
      throw error;
    }
  }




}
