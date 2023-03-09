import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("post")
export class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar")
  title: string;
  @Column("text")
  content: string;
}
