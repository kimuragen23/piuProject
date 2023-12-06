import Order from "src/orders/entities/order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_orderstatus' })
@Unique(['orderstatus_id'])
export class Orderstatus {
    @PrimaryGeneratedColumn()
    orderstatus_id: number;

    @Column({ type: 'varchar', length: 50, comment: '상태명' })
    name: string;

}
