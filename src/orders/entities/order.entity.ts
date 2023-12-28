
import { Accountinfo } from "src/accountinfo/entities/accountinfo.entity";
import { Orderstatus } from "src/orderstatus/entities/orderstatus.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, Unique } from "typeorm";

@Entity({ name: 'tb_order' })
@Unique(['order_id'])
export default class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column({ type: 'varchar', length: 100, comment: '주문번호' })
    order_code: String;

    @Column({ type: 'varchar', length: 10, comment: '주문자명' })
    cust_name: string;

    @Column({ type: 'varchar', length: 15, comment: '전화번호' })
    phone_number: string;

    @Column({ type: 'varchar', length: 25, comment: '이메일' })
    email: string;

    @Column({ type: 'varchar', length: 20, comment: '주문자 비밀번호' })
    cust_pwd: string;

    @Column({ type: 'varchar', length: 10, comment: '우편번호' })
    zipCode: string;

    @Column({ type: 'varchar', length: 60, comment: '주소' })
    fullAddress: string;

    @Column({ type: 'varchar', length: 20, comment: '상세주소' })
    detailAddress: string;

    @Column({ type: 'varchar', length: 20, comment: '추가주소' })
    extraAddress: string;

    @Column({ type: 'tinyint', comment: '수집동의' })
    agree: boolean;

    @Column({ type: 'varchar', length: 10, comment: '입금자명' })
    depositor_name: string;

    @CreateDateColumn({ comment: '생성 날짜' }) //해당 열이 추가된 시각을 자동으로 기록합
    create_date: Date;

    @UpdateDateColumn({ comment: '업데이트 날짜' })
    update_date?: Date | null;

    @DeleteDateColumn({ comment: '삭제 날짜' })
    delete_date?: Date | null;


    /**
   * N : 1 관계 설정
   * ManyToOne -> 해당 엔티티(Order) To 대상 엔티티(Orderstatus)
   *              여러개의 주문은 하나 상태를 갖는다.
   */
    @ManyToOne(type => Orderstatus, orderstatus => orderstatus.orderstatus_id)
    @JoinColumn({ name: 'orderstatus_id', foreignKeyConstraintName: 'orderstatus_id' })
    orderstatus: Orderstatus;

    @ManyToOne(type => Accountinfo, accountinfo => accountinfo.accountinfo_id)
    @JoinColumn({ name: 'accountinfo_id', foreignKeyConstraintName: 'accountinfo_id' })
    accountinfo: Accountinfo;

}