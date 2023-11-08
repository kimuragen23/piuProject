import { Injectable, NotFoundException } from '@nestjs/common';
import { CatEntity } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(CatEntity)
  private catsRepository: Repository<CatEntity>) { }


  async create(cat: CatEntity): Promise<CatEntity> {
    const newCat = this.catsRepository.create(cat);
    return await this.catsRepository.save(newCat);
  }

  async update(id: number, cat: CatEntity): Promise<number> {
    await this.catsRepository.update(id, cat);
    return id
  }

  async getAll(): Promise<CatEntity[]> {
    return this.catsRepository.find();
  }

  async getOne(id: number): Promise<CatEntity> {
    return await this.catsRepository.findOne({
      where: {
        id
      }
    });
  }

  async remove(id: number): Promise<number> {
    await this.catsRepository.delete(id);
    return id
  }




}
