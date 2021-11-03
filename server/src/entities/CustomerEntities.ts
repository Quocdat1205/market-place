import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Items } from "./index";

@Entity()
export default class Customers {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  pw: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  phone: string;

  @Column()
  add: string;

  @Column({ default: "normal" })
  rank: string;

  @Column({ default: 0 })
  point: number;

  @Column({ default: new Date() })
  time_active: Date;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: 2 })
  permission: number;

  @OneToMany((_type) => Items, (items) => items.customer) items: Items[];

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn({ default: new Date() })
  updatedAt: Date;
}
