import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

//상품코드 테이블
@Entity({ name: 'tb_productcode' })
@Unique(['productcode_id'])
export class Productcode {
    @PrimaryGeneratedColumn()
    productcode_id: number;

    @Column({ type: 'varchar', length: 50, comment: '상품코드 구분' })
    product_code: string;

    @OneToMany(type => Product, product => product.productcode)
    product: Product;
}
