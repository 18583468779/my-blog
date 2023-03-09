import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Comment } from "./entities/Comment";
import { CreateUsers1678360308008 } from "./migration/1678360308008-CreateUsers";
import { CreatePosts1678364313408 } from "./migration/1678364313408-CreatePosts";
import { CreateComments1678364461161 } from "./migration/1678364461161-CreateComments";
import { AddCreatedAtAndUpdatedAt1678364539773 } from "./migration/1678364539773-AddCreatedAtAndUpdatedAt";
import { RenameColumns1678370943331 } from "./migration/1678370943331-RenameColumns";
import { AddUniqueUsernameToUsers1678371008013 } from "./migration/1678371008013-AddUniqueUsernameToUsers";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  logging: false,
  entities: [User, Post, Comment],
  migrations: [
    CreateUsers1678360308008,
    CreatePosts1678364313408,
    CreateComments1678364461161,
    AddCreatedAtAndUpdatedAt1678364539773,
    RenameColumns1678370943331,
    AddUniqueUsernameToUsers1678371008013,
  ],
  subscribers: ["src/subscriber/**/*{.ts,.js}"],
});
