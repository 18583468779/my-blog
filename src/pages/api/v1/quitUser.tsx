import { NextApiHandler } from "next";
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
    req.session.destroy(); //清除缓存
    res.statusCode = 200;
    res.write(JSON.stringify({ done: "退出登录成功" }));

    res.end();
  }
});
export default getImage;
