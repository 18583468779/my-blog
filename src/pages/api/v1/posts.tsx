import { getDataSource } from "@/data-source";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { NextApiHandler } from "next";
import { withSessionRoute } from "../../../../lib/withSession";

const Posts: NextApiHandler = withSessionRoute(async (req, res) => {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    //@ts-ignore
    const user = req.session.user?.username;
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    const AppDataSource = await getDataSource();
    //根据session用户名查询用户
    const userRepository = AppDataSource.getRepository(User);
    const hasUser = await userRepository.findOneBy({
      username: user,
    });
    post.author = hasUser;
    const postRepository = AppDataSource.getRepository(Post);
    await postRepository.save(post);
    res.json(post);
  }
});
export default Posts;
