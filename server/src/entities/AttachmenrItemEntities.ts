import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class AttachmentItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  id_item: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
