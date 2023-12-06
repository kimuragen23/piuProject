import { Brand } from "src/brands/entities/brand.entity";
import { Productcode } from "src/productcode/entities/productcode.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_products' })
@Unique(['product_id'])
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({ type: 'varchar', length: 150, comment: '상품명' })
    product_name: string;

    @Column({ comment: '가격' })
    price: number;

    @Column({ type: 'varchar', length: 50, comment: '사이즈' })
    size: string;

    @Column({ comment: '재고' })
    inventory: number;

    @Column({ type: 'varchar', length: 255, comment: '상품설명' })
    product_text: string;

    @Column({ type: 'varchar', length: 150, nullable: true, comment: '이미지파일' })
    image: string;

    @Column({ type: 'varchar', length: 150, nullable: true, comment: '이미지설명' })
    image_text: string;

    @Column({ type: 'varchar', length: 150, comment: '상품제목' })
    product_title: string;


    @ManyToOne(type => Brand, brand => brand.product)
    @JoinColumn({ name: 'brand_id', foreignKeyConstraintName: 'brand_id' })
    brand: Brand;

    @ManyToOne(type => Productcode, productcode => productcode.product)
    @JoinColumn({ name: 'productcode_id', foreignKeyConstraintName: 'productcode_id' })
    productcode: Productcode;
}
