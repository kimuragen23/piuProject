import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './entities/order.entity';
import { Accountinfo } from 'src/accountinfo/entities/accountinfo.entity';
import { Orderstatus } from 'src/orderstatus/entities/orderstatus.entity';
import { Orderdetail } from 'src/orderdetail/entities/orderdetail.entity';
import { Product } from 'src/products/entities/product.entity';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Accountinfo, Orderstatus, Orderdetail, Product]),
    MailerModule.forRoot({
      transport: {
        // SMTP 설정
        host: 'smtp.gmail.com', //smtp 호스트
        port: 587,
        secure: false,
        auth: {
          user: 'juhee10131013@gmail.com',
          pass: 'qpzm mrgc qaba vbja',
        }
      },
      template: {
        dir: join(__dirname, '..', '..', 'views'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })

  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
