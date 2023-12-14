import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import Order from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatchService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>) { }

    @Cron('0 58 * * * *', { name: 'cronTask' })
    async handleCron() {
        console.log('Delete Called!');
        let result = await this.orderRepository.createQueryBuilder("o")
            .select('o.order_id', 'order_id')
            .addSelect('o.create_date', 'create_date')
            .where('DATE_ADD(o.create_date, INTERVAL 3 DAY) <= now()', {})
            .andWhere('o.orderstatus_id = 1', {})
            .andWhere('o.delete_date is null', {})
            .getRawMany();
        let delete_id = []
        result.map((v, i) => {
            delete_id.push(v.order_id);
        });
        console.log(delete_id);
        if (delete_id.length > 0) {
            await this.orderRepository.createQueryBuilder("o")
                .update()
                .set({ delete_date: new Date() })
                .where("order_id in ( :delete_id )", { delete_id })
                .execute();
        }
    }
}
