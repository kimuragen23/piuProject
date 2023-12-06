import Order from "src/orders/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity({ name: 'tb_orderdetail' })
@Unique(['orderdetail_id'])
export class Orderdetail extends BaseEntity {
    @PrimaryGeneratedColumn()
    orderdetail_id: number;

    @ManyToOne(type => Order, order => order.order_id)
    @JoinColumn({ name: 'order_id', foreignKeyConstraintName: 'order_id' })
    order: Order;

    @ManyToOne(type => Product, product => product.product_id)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ comment: '주문수량' })
    orderproduct_count: number;
}
