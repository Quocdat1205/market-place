import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_customer: string;

  @Column()
  id_items: string;

  @Column()
  date_transaction: Date;

  @Column()
  price: Date;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
