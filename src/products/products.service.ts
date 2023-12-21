import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Productcode } from 'src/productcode/entities/productcode.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import Order from 'src/orders/entities/order.entity';
import { ReadProductDto } from './dto/read-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Productcode)
    private readonly productcodeRepository: Repository<Productcode>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>) { }

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

  async findAllByProductDetail(product_id: number): Promise<ReadProductDto> {
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

    let soldout = await this.getSoldout(product_id);
    let readProduct = new ReadProductDto();
    readProduct.product_id = product.product_id;
    readProduct.product_name = product.product_name;
    readProduct.price = product.price;
    readProduct.inventory = soldout["inventory"];
    readProduct.isSoldout = soldout["isSoldout"];

    return readProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async getSoldout(product_id: number): Promise<Object> {
    let soldout = await this.orderRepository.createQueryBuilder("o")
      .select('sum(od.orderproduct_count)', 'inventory')
      .leftJoin('tb_orderdetail', 'od', 'o.order_id = od.order_id')
      .leftJoin('tb_products', 'p', 'p.product_id = od.product_id')
      .where('o.orderstatus_id = 1', {})
      .andWhere('o.delete_date is null', {})
      .andWhere('od.product_id = :product_id', { product_id })
      .orWhere('o.orderstatus_id =  2', {})
      .andWhere('od.product_id = :product_id', { product_id })
      .getRawOne();

    let product = await this.productRepository.createQueryBuilder("p")
      .select('p.inventory', 'inventory')
      .where('p.product_id = :product_id', { product_id })
      .getRawOne();

    let inventory = +product.inventory - +soldout.inventory;
    if (inventory <= 0) {
      return {
        "inventory": 0,
        "isSoldout": true
      };
    } else {
      return {
        "inventory": inventory,
        "isSoldout": false
      };
    }

  }

  /**
select 
  sum(od.orderproduct_count) as numberSales
from tb_order o
left join tb_orderdetail od
on o.order_id = od.order_id
left join tb_products p
on p.product_id = od.product_id
where o.orderstatus_id =1 and o.delete_date is null or o.orderstatus_id = 2;
   */
}
