import { getDataSource } from "@/data-source";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";

import { NextApiHandler } from "next";
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
    //根据博客id查询
    const hasPost = await postRepository.find({
      where: { id: id },
    });

    if (hasPost) {
      hasPost[0].title = title;
      hasPost[0].content = content;
      // console.log(hasPost, "hasPost");
      await postRepository.save(hasPost);
      res.statusCode = 200;
      res.write(JSON.stringify({ hasPost }));
    }

    res.end();
  }
});
export default editPosts;
