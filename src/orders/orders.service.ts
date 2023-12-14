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
import { MailerService } from '@nestjs-modules/mailer';

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
    private productRepository: Repository<Product>,
    private readonly mailerService: MailerService) { }


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
      order.zipCode = createOrderDto.address.zipCode;
      order.fullAddress = createOrderDto.address.fullAddress;
      order.detailAddress = createOrderDto.address.detailAddress;
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
        this.orderdetailRepository.save(orderdetail).then(async () => {
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const hour = date.getHours();
          const minute = date.getMinutes();
          const amPm = hour >= 12 ? '오후' : '오전';
          const order_date = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분 ${amPm}`;

          try {
            await this.mailerService.sendMail({
              from: 'juhee10131013@gmail.com',
              to: order.email, //string or Array
              subject: "주문이 성공적으로 완료되었습니다.",
              text: "",
              template: 'orders_mail.hbs',
              context: {  // Data to be sent to template files.
                order_code: order.order_code,
                order_date: order_date,
                cust_name: order.cust_name,
                phone: order.phone_number,
                email: order.email,
                address: `(${order.zipCode})${order.fullAddress} ${order.detailAddress}`,
                depositorName: order.depositor_name,
                price: orderdetail.product.price * product_info.orderproduct_count,
                accountinfo: `${order.accountinfo.account_bank}(${order.accountinfo.account_number}) / ${order.accountinfo.account_name}`
              }
            });
            console.log('메일이 전송되었습니다')
          } catch (error) {
            console.error('메일 전송 중 오류가 발생했습니다:', error);
          }
        });
      });
      return order;
    } catch (error) {
      throw error;
    }
  }


  async findOne(readOrderDto: ReadOrderDto): Promise<OrderDetailDto> {
    try {
      console.log(process.env.PASS);
      console.log(process.env.EMAIL);
      let order_code: String = readOrderDto.order_code;
      let cust_name: String = readOrderDto.cust_name;
      let cust_pwd: String = readOrderDto.cust_pwd;
      let orderdetail = new OrderDetailDto();
      let address = new AddressDto();
      let result = await this.orderRepository.createQueryBuilder("o")
        .select('o.cust_name', 'cust_name')
        .addSelect('o.email', 'email')
        .addSelect('o.phone_number', 'phone_number')
        .addSelect('o.zipCode', 'zipCode')
        .addSelect('o.fullAddress', 'fullAddress')
        .addSelect('o.detailAddress', 'detailAddress')
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

      address.zipCode = result.zipCode;
      address.fullAddress = result.fullAddress;
      address.detailAddress = result.detailAddress;
      orderdetail.address = address;

      return orderdetail;
    } catch (error) {
      throw error;
    }
  }
  async dpstPrcsn(readOrderDto: ReadOrderDto): Promise<string> {
    try {
      if (readOrderDto.cust_pwd == process.env.ADMINPASS) {
        await this.orderRepository.createQueryBuilder("o")
          .update()
          .set({
            orderstatus: { orderstatus_id: 2 },
            update_date: new Date(),
            delete_date: null,
          })
          .where("order_code = :order_code", { order_code: readOrderDto.order_code })
          .andWhere("cust_name = :cust_name", { cust_name: readOrderDto.cust_name })
          .execute();
      }

      return '굿~';
    } catch (error) {
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
