import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_brand' })
export class Brand {
    @PrimaryGeneratedColumn()
    brand_id: number;

    @Column()
    brand_name: string;
}
