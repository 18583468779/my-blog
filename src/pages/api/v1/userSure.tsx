import { NextApiHandler } from "next";
import { withSessionRoute } from "../../../../lib/withSession";
//判断用户是否登录
const userSure: NextApiHandler = async (req, res) => {
  //   console.log("req.session", req.session);
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.write(JSON.stringify(req.session));
  res.end();
};
export default withSessionRoute(userSure);
