import { getDataSource } from "@/data-source";
import { User } from "@/entities/User";
import md5 from "md5";
import { NextApiHandler } from "next";
import { withSessionRoute } from "../../../../lib/withSession";

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  const errors = {
    username: [] as string[],
    password: [] as string[],
  };
  const user = new User();
  res.setHeader("Content-Type", "application/json");

  const AppDataSource = await getDataSource();
  const userRepository = AppDataSource.getRepository(User);
  const hasUser = await userRepository.findOneBy({
    username: username,
  });
  if (username.trim() === "") {
    errors.username.push("用户名不能为空");
  } else {
    if (hasUser) {
      //用户存在
      if (hasUser.passwordDigest !== md5(password)) {
        errors.password.push("密码不匹配");
      }
    } else {
      errors.username.push("用户不存在");
    }
  }
  const hasErrors = !!Object.values(errors).find((v) => v.length > 0);

  if (hasErrors) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    user.username = username;
    user.password = md5(password);
    //设置session
    //@ts-ignore
    req.session.user = {
      currentUser: true,
      username: username,
    };
    await req.session.save();
    // console.log("req.session", req.session);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};
export default withSessionRoute(Sessions);
