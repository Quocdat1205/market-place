import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Label {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  id_creator: string;

  @Column()
  id_items: string;

  @Column()
  label_name: string;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
