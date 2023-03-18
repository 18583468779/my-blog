import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Comment } from "./entities/Comment";
import { CreatePosts1678364313408 } from "./migration/1678364313408-CreatePosts";
import { CreateComments1678364461161 } from "./migration/1678364461161-CreateComments";
import { AddCreatedAtAndUpdatedAt1679125655342 } from "./migration/1679125655342-AddCreatedAtAndUpdatedAt";
import { RenameColumns1679125655342 } from "./migration/1678370943331-RenameColumns";
import { AddUniqueUsernameToUsers1678371008013 } from "./migration/1678371008013-AddUniqueUsernameToUsers";
import { AddMoreUserInfo1679122540574 } from "./migration/1679122540574-AddMoreUserInfo";
import { CreateUsers1679125652989 } from "./migration/1679125652989-CreateUsers";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "blog",
  password: "",
  database:
    process.env.NODE_ENV === "production"
      ? "blog_production"
      : "blog_development",
  synchronize: false,
  logging: false,
  entities: [User, Post, Comment],
  migrations: [
    CreateUsers1679125652989,
    CreatePosts1678364313408,
    CreateComments1678364461161,
    AddCreatedAtAndUpdatedAt1679125655342,
    RenameColumns1679125655342,
    AddUniqueUsernameToUsers1678371008013,
    AddMoreUserInfo1679122540574,
  ],
  subscribers: ["src/subscriber/**/*{.ts,.js}"],
});
AppDataSource.initialize()
  .then(async () => {
    console.log("Connection initialized with database...");
  })
  .catch((error) => console.log(error));

export const getDataSource = (delay = 1000): Promise<DataSource> => {
  if (AppDataSource.isInitialized) return Promise.resolve(AppDataSource);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (AppDataSource.isInitialized) resolve(AppDataSource);
      else reject("Failed to create connection with database");
    }, delay);
  });
};
