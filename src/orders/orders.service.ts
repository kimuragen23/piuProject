import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Order from './entities/order.entity';
import { Accountinfo } from 'src/accountinfo/entities/accountinfo.entity';
import { Orderstatus } from 'src/orderstatus/entities/orderstatus.entity';
import { createOrderCode } from 'src/products/utils/create-ordercode';
import { Orderdetail } from 'src/orderdetail/entities/orderdetail.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Accountinfo)
    private readonly accountinfoRepository: Repository<Accountinfo>,
    @InjectRepository(Orderstatus)
    private readonly orderstatusRepository: Repository<Orderstatus>,
    @InjectRepository(Orderdetail)
    private readonly orderdetailRepository: Repository<Orderdetail>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>) { }


  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      let order_code = createOrderCode.getRandomString();
      const order = new Order();
      order.order_code = order_code;
      order.cust_name = createOrderDto.cust_name;
      order.phone_number = createOrderDto.phone_number;
      order.email = createOrderDto.email;
      order.cust_pwd = createOrderDto.cust_pwd;
      order.cust_post = createOrderDto.address.cust_post;
      order.cust_address = createOrderDto.address.cust_address;
      order.cust_detailaddress = createOrderDto.address.cust_detailaddress;
      order.agree = createOrderDto.agree;
      order.depositor_name = createOrderDto.depositor_name;
      try {
        order.accountinfo = await this.accountinfoRepository.findOne({
          where: {
            accountinfo_id: 1,
          }
        });
      } catch (error) {
        throw error
      }
      try {
        order.orderstatus = await this.orderstatusRepository.findOne({
          where: {
            orderstatus_id: 1,
          }
        });
      } catch (error) {
        throw error
      }
      this.orderRepository.save(order).then(async () => {
        createOrderDto.product_info.map(async (v, i) => {
          const orderdetail = new Orderdetail();
          orderdetail.orderproduct_count = v.orderproduct_count;
          try {
            orderdetail.order = await this.orderRepository.createQueryBuilder('o')
              .select()
              .where('o.order_code = :order_code', { order_code })
              .getOne();
          } catch (error) {
            throw error
          }
          try {
            orderdetail.product = await this.productRepository.findOne({
              where: {
                product_id: v.product_id
              }
            });
          } catch (error) {
            throw error
          }
          console.log(orderdetail);
          await this.orderdetailRepository.save(orderdetail)
        });
      });
      return order;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
