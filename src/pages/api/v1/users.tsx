import { getDataSource } from "@/data-source";
import { User } from "@/entities/User";
import { NextApiHandler } from "next";
import md5 from "md5";
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
    await userRepository.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};

export default Users;
