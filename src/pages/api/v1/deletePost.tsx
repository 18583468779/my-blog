import { NextApiHandler } from "next";
import { getDataSource } from "src/data-source";
import { Post } from "src/entities/Post";
import { withSessionRoute } from "../../../../lib/withSession";

//判断用户是否登录
const editPosts: NextApiHandler = withSessionRoute(async (req, res) => {
  const { title, content, id } = req.body;
  console.log(title, content, id);
  if (req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    //@ts-ignore
    const user = req.session.user?.username;
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }

    const AppDataSource = await getDataSource();

    const postRepository = AppDataSource.getRepository(Post);
    //根据博客id查询删除
    const hasPost = await postRepository.delete({
      id: id,
    });

    if (hasPost) {
      res.statusCode = 200;
      res.write(JSON.stringify({ hasPost }));
    }

    res.end();
  }
});
export default editPosts;
