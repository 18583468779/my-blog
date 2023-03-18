import { Comment } from "./Comment";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("varchar")
  username: string;
  @Column("varchar")
  passwordDigest: string;
  @Column("varchar")
  picture: string;
  @Column("varchar")
  email: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany("Post", "author")
  posts: Post[];
  @OneToMany("Comment", "user")
  comments: Comment[];
  password: string = "";
  passwordConfirm: string = "";
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirm: [] as string[],
  };

  async validate() {
    if (this.username.trim() === "") {
      this.errors.username.push("用户名不能为空");
    }
    if (this.username.length > 42) {
      this.errors.username.push("用户名太长");
    }

    if (this.password.trim() === "") {
      this.errors.password.push("密码不能为空");
    }
    if (this.password.length > 42) {
      this.errors.password.push("密码太长");
    }
    if (this.password.length < 3) {
      this.errors.password.push("密码太短");
    }
    if (this.password !== this.passwordConfirm) {
      this.errors.passwordConfirm.push("密码不匹配");
    }
  }
  hasErrors() {
    return !!Object.values(this.errors).find((v) => v.length > 0);
  }
}
