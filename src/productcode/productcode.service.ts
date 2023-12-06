import { Injectable } from '@nestjs/common';
import { CreateProductcodeDto } from './dto/create-productcode.dto';
import { UpdateProductcodeDto } from './dto/update-productcode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Productcode } from './entities/productcode.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class ProductcodeService {
  constructor(@InjectRepository(Productcode)
  private productcodeRepository: Repository<Productcode>) { }

  async create(createProductcodeDto: CreateProductcodeDto): Promise<CreateProductcodeDto> {
    try {
      return await this.productcodeRepository.save(createProductcodeDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Productcode[]> {
    try {
      return await this.productcodeRepository.find();
    } catch (error) {
      throw error
    }
  }

  async findOne(productcode_id: number): Promise<Productcode> {
    try {
      return await this.productcodeRepository.findOne({
        where: {
          productcode_id
        }
      });
      //select * from cat where 
    } catch (error) {
      throw error
    }
  }

  async update(productcode_id: number, updateProductcodeDto: UpdateProductcodeDto): Promise<Productcode> {
    try {
      const productcode = await this.productcodeRepository.findOne({
        where: {
          productcode_id
        }
      });
      if (!productcode) {
        throw new EntityNotFoundError(Productcode, productcode_id);
      }
      const result = await this.productcodeRepository.save({
        ...productcode,
        ...updateProductcodeDto,
      });
      return result;
    } catch (error) {
      throw error
    }
  }

  async remove(productcode_id: number) {
    try {
      const productcode = await this.productcodeRepository.findOne({
        where: {
          productcode_id
        }
      });
      if (!productcode) {
        throw new EntityNotFoundError(Productcode, productcode_id);
      }
      await this.productcodeRepository.delete({
        productcode_id: productcode.productcode_id,
      });
      return productcode.productcode_id;
    } catch (error) {
      throw error;
    }
  }
}
