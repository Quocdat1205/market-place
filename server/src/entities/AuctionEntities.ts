import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_item: string;

  @Column()
  itmeline: Date;

  @Column()
  starting_price: number;

  @Column()
  status: string;

  @Column()
  from: Date;

  @Column()
  to: Date;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
