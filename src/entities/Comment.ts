import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comment")
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("text")
  content: string;
}
