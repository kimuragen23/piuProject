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
import { ReadOrderDto } from './dto/read-order.dto';
import { OrderDetailDto } from './dto/orderdetail.dto';
import { AddressDto } from './dto/address.dto';
import { ProductInfoDto } from './dto/productinfo.dto';

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
      const product_info = createOrderDto.product_info;
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

        const orderdetail = new Orderdetail();
        orderdetail.orderproduct_count = product_info.orderproduct_count;
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
              product_id: product_info.product_id
            }
          });
        } catch (error) {
          throw error
        }
        console.log(orderdetail);
        await this.orderdetailRepository.save(orderdetail)
      });
      return order;
    } catch (error) {
      throw error;
    }
  }


  async findOne(readOrderDto: ReadOrderDto): Promise<OrderDetailDto> {
    try {
      let order_code: String = readOrderDto.order_code;
      let cust_name: String = readOrderDto.cust_name;
      let cust_pwd: String = readOrderDto.cust_pwd;
      let orderdetail = new OrderDetailDto();
      let address = new AddressDto();
      let result = await this.orderRepository.createQueryBuilder("o")
        .select('o.cust_name', 'cust_name')
        .addSelect('o.email', 'email')
        .addSelect('o.phone_number', 'phone_number')
        .addSelect('o.cust_post', 'cust_post')
        .addSelect('o.cust_address', 'cust_address')
        .addSelect('o.cust_detailaddress', 'cust_detailaddress')
        .addSelect('o.depositor_name', 'depositor_name')
        .addSelect('os.name', 'orderstatus')
        .addSelect('od.orderproduct_count', 'product_count')
        .addSelect('p.product_name', 'product_name')
        .addSelect('p.price', 'product_price')
        .addSelect('ai.account_name', 'account_name')
        .addSelect('ai.account_number', 'account_number')
        .addSelect('ai.account_bank', 'account_bank')
        .leftJoin('tb_orderstatus', 'os', 'os.orderstatus_id = o.orderstatus_id')
        .leftJoin('tb_orderdetail', 'od', 'od.order_id = o.order_id')
        .leftJoin('tb_products', 'p', 'p.product_id = od.product_id')
        .leftJoin('tb_accountinfo', 'ai', 'ai.accountinfo_id = o.accountinfo_id')
        .where('o.order_code = :order_code', { order_code })
        .andWhere('o.cust_name = :cust_name', { cust_name })
        .andWhere('o.cust_pwd = :cust_pwd', { cust_pwd })
        .getRawOne();

      orderdetail.cust_name = result.cust_name;
      orderdetail.email = result.email;
      orderdetail.phone_number = result.phone_number;
      orderdetail.depositor_name = result.depositor_name;
      orderdetail.orderstatus = result.orderstatus;
      orderdetail.account_name = result.account_name;
      orderdetail.account_number = result.account_number;
      orderdetail.account_bank = result.account_bank;

      orderdetail.product_count = result.product_count;
      orderdetail.product_name = result.product_name;
      orderdetail.product_price = result.product_price;

      address.cust_post = result.cust_post;
      address.cust_address = result.cust_address;
      address.cust_detailaddress = result.cust_detailaddress;
      orderdetail.address = address;

      return orderdetail;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
