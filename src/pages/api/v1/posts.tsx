import { getDataSource } from "@/data-source";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { NextApiHandler } from "next";
import { withSessionRoute } from "../../../../lib/withSession";

const Posts: NextApiHandler = withSessionRoute(async (req, res) => {
  if (req.method === "POST") {
    const { title, content } = req.body;
    const errors = {
      title: [] as string[],
      content: [] as string[],
    };
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

    if (title === "") {
      errors.title.push("标题不能为空");
    }
    if (title.length > 40) {
      errors.title.push("标题过长");
    }
    if (content === "") {
      errors.content.push("内容不能为空");
    }

    const validate = () => {
      return !!Object.values(errors).find((v) => v.length > 0);
    };

    // console.log(title, content, errors, validate());
    if (validate()) {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 422;
      res.write(JSON.stringify(errors));
      res.end();
    } else {
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
  }
});
export default Posts;
