import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class AttachmentCustomer {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  id_customer: string;

  @Column()
  url: string;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
