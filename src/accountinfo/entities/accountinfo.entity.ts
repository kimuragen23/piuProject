import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tb_accountinfo' })
@Unique(['accountinfo_id'])
export class Accountinfo {
    @PrimaryGeneratedColumn()
    accountinfo_id: number;

    @Column({ type: 'varchar', length: 25, comment: '계좌명' })
    account_name: string;

    @Column({ type: 'varchar', length: 55, comment: '계좌번호' })
    account_number: string;

    @Column({ type: 'varchar', length: 50, comment: '계좌은행' })
    account_bank: string;
}
