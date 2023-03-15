import { NextPage } from "next";
import Link from "next/link";
import { Post } from "@/entities/Post";
import { getDataSource } from "@/data-source";
import { withSessionSsr } from "../../../lib/withSession";
import { User } from "@/entities/User";
import _ from "lodash";
import { usePager } from "@/hooks/userPager";

type Props = {
  posts: Post[];
  pager: number;
  page: number;
  totalPage: number;
};
const PostsIndex: NextPage<Props> = (props) => {
  const { posts, page, totalPage } = props;
  const { pager } = usePager({ page, totalPage });
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}> {p.title ? p.title : "没有标题"}</Link>
        </div>
      ))}
      <footer>{pager}</footer>
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
    //获取url:page
    const urlParams = new URL("https://example.com/" + req.url).searchParams;
    const query = urlParams.get("page"); //第几页
    const page = parseInt(query?.toString()) || 1;
    //每页10个博客
    const perPage = 10;
    //根据用户id获取对应的博客，pagePostCount是一共的数据
    const [pagePost, pagePostCount] = await postRepository.findAndCount({
      where: { authorId: hasUser.id },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      props: {
        posts: JSON.parse(JSON.stringify(pagePost)),
        totalPage: Math.ceil(pagePostCount / perPage), //一共几页
        page,
        pagePostCount,
      },
    };
  }
);
