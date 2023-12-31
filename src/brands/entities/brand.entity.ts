import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_brands' })
@Unique(['brand_id'])
export class Brand {
    @PrimaryGeneratedColumn()
    brand_id: number;

    @Column({ type: 'varchar', length: 150, comment: '브랜드 명' })
    brand_name: string;

    @OneToMany(type => Product, product => product.productcode)
    product: Product;
}
