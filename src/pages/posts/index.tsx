import { GetServerSideProps, NextPage } from "next";

import Link from "next/link";
import { Post } from "@/entities/Post";
import { getPosts } from "../../../lib/posts";
import { getDataSource } from "@/data-source";
import { withSessionSsr } from "../../../lib/withSession";
import { User } from "@/entities/User";

type Props = {
  posts: Post[];
};
const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props;
  console.log(posts);
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>{p.title ? p.title : "没有标题"}</Link>
        </div>
      ))}
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    //@ts-ignore
    const username = req.session.user?.username; //根据session获取用户id
    if (!username) {
      return;
    }
    const AppDataSource = await getDataSource();

    const userRepository = AppDataSource.getRepository(User);
    const hasUser = await userRepository.findOneBy({
      username: username,
    });
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find({
      where: { authorId: hasUser.id },
    });
    console.log("req", Object.keys(req), req.url);
    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  }
);
