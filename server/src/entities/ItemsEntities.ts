import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Customers } from "./index";

@Entity()
export default class Items {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  id_owner: string;

  @Column()
  name: string;

  @Column()
  attachment: string;

  @Column()
  rarity: string;

  @Column()
  price: string;

  @Column()
  description: String;

  @Column()
  point: number;

  @ManyToOne((_type) => Customers, (customer) => customer.items)
  customer: Customers[];

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
