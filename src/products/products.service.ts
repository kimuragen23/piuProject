import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Productcode } from 'src/productcode/entities/productcode.entity';
import { Brand } from 'src/brands/entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Productcode)
    private readonly productcodeRepository: Repository<Productcode>) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {

      const product = new Product();
      product.product_name = createProductDto.product_name;
      product.price = createProductDto.price;
      product.size = createProductDto.size;
      product.inventory = createProductDto.inventory;
      product.product_text = createProductDto.product_text;
      product.image = createProductDto.image;
      product.image_text = createProductDto.image_text;
      product.product_title = createProductDto.product_title;

      if (createProductDto.brand_id) {
        try {
          product.brand = await this.brandsRepository.findOne({
            where: {
              brand_id: createProductDto.brand_id,
            }
          });
        } catch (error) {
          throw error
        }
      }
      if (createProductDto.productcode_id) {
        product.productcode = await this.productcodeRepository.findOne({
          where: {
            productcode_id: createProductDto.productcode_id
          }
        });
      }

      return await this.productRepository.save(product);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    let products = await this.productRepository.createQueryBuilder("p")
      .select('b.brand_id', 'brand_id')
      .addSelect('b.brand_name', 'brand_name')
      .addSelect('pc.productcode_id', 'productcode_id')
      .addSelect('p.product_name', 'product_name')
      .leftJoin('tb_brands', 'b', 'b.brand_id = p.brand_id')
      .leftJoin('tb_productcode', 'pc', 'pc.productcode_id = p.productcode_id')
      .groupBy('pc.productcode_id')
      .getRawMany();
    return products;
  }

  async findAllByProductDetail(product_id: number): Promise<Product> {
    let product = await this.productRepository.createQueryBuilder("p")
      .select('p.product_id', 'product_id')
      .addSelect('p.brand_id', 'brand_id')
      .addSelect('b.brand_name', 'brand_name')
      .addSelect('p.productcode_id', 'productcode_id')
      .addSelect('p.product_name', 'product_name')
      .addSelect('p.size', 'size')
      .addSelect('p.price', 'price')
      .addSelect('p.inventory', 'inventory')
      .leftJoin('tb_brands', 'b', 'b.brand_id = p.brand_id')
      .where('p.product_id = :product_id', { product_id })
      .getRawOne();
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
