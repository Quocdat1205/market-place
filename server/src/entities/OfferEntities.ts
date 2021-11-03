import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_customer: string;

  @Column()
  id_item: Date;

  @Column()
  price_offer: number;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
