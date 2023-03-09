import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

AppDataSource.initialize()
  .then(async () => {
    console.log("数据库链接成功");
    const u1 = new User();
    u1.username = "xiewen";
    u1.passwordDigest = "aiaiai123456";
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(u1);
  })
  .catch((error) => console.log(error));
