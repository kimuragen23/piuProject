import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand)
  private brandsRepository: Repository<Brand>) { }

  async create(createBrandDto: CreateBrandDto): Promise<CreateBrandDto> {
    try {
      return await this.brandsRepository.save(createBrandDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Brand[]> {
    try {
      return await this.brandsRepository.find();
    } catch (error) {
      throw error
    }
  }

  async findOne(brand_id: number): Promise<Brand> {
    try {
      return await this.brandsRepository.findOne({
        where: {
          brand_id
        }
      });
      //select * from cat where 
    } catch (error) {
      throw error
    }
  }

  async update(brand_id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.findOne({
        where: {
          brand_id
        }
      });
      if (!brand) {
        throw new EntityNotFoundError(Brand, brand_id);
      }
      const result = await this.brandsRepository.save({
        ...brand,
        ...updateBrandDto,
      });
      return result;
    } catch (error) {
      throw error
    }
  }

  async remove(brand_id: number): Promise<number> {
    try {
      const brand = await this.brandsRepository.findOne({
        where: {
          brand_id
        }
      });
      if (!brand) {
        throw new EntityNotFoundError(Brand, brand_id);
      }
      await this.brandsRepository.delete({
        brand_id: brand.brand_id,
      });
      return brand.brand_id;
    } catch (error) {
      throw error;
    }
  }
}
