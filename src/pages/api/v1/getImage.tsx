import { NextApiHandler } from "next";
import { getDataSource } from "src/data-source";
import { User } from "src/entities/User";
import { withSessionRoute } from "../../../../lib/withSession";

//判断用户是否登录
const getImage: NextApiHandler = withSessionRoute(async (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    //@ts-ignore
    const user = req.session.user?.username;
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }

    //根据session用户名查询用户
    const AppDataSource = await getDataSource();
    const userRepository = AppDataSource.getRepository(User);
    const hasUser = await userRepository.findOneBy({
      username: user,
    });
    if (hasUser) {
      const image = hasUser.picture;
      res.statusCode = 200;
      res.write(JSON.stringify({ image }));
    }

    res.end();
  }
});
export default getImage;
