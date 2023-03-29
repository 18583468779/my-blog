import { NextApiHandler } from "next";
import md5 from "md5";
import { getDataSource } from "/data-source";
import { User } from "/entities/User";
const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirm } = req.body;

  const user = new User();
  res.setHeader("Content-Type", "application/json");

  user.username = username;
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.validate();

  const hasErrors = user.hasErrors();
  if (hasErrors) {
    res.statusCode = 422;
    res.write(JSON.stringify(user.errors));
  } else {
    user.username = username;
    user.passwordDigest = md5(password);
    const AppDataSource = await getDataSource();
    const userRepository = AppDataSource.getRepository(User);
    //判断是否已经注册
    const hasUser = await userRepository.find({
      where: { username: username },
    });
    // console.log(hasUser, "hasUser");
    if (hasUser.length == 0) {
      await userRepository.save(user);
      res.statusCode = 200;
      res.write(JSON.stringify(user));
    } else {
      res.statusCode = 422;
      user.errors.username.push("用户已注册");
      res.write(JSON.stringify(user.errors));
    }
  }
  res.end();
};

export default Users;
