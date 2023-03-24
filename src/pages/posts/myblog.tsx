import { NextPage } from "next";
import styles from "@/styles/MyBlog.module.css";
import { Post } from "@/entities/Post";
import { usePager } from "@/hooks/userPager";
import Link from "next/link";
import { getDataSource } from "@/data-source";
import { User } from "@/entities/User";
import { withSessionSsr } from "../../../lib/withSession";

type Props = {
  posts: Post[];
  pager: number;
  page: number;
  totalPage: number;
  username: string;
};
const Myblog: NextPage<Props> = (props) => {
  const { posts, page, totalPage, username } = props;
  const { pager } = usePager({ page, totalPage });
  return (
    <div className={styles.myBlog}>
      <div className={"container"}>
        <div className={styles.blogTitle}>
          <img src="/images/blog-logo.png" alt="blog-title" width={64} />
          <h1>我的博客</h1>
        </div>
        <div className={styles.postList}>
          {posts.length > 0 ? (
            posts.map((p) => (
              <div key={p.id} className={styles.link}>
                <Link href={`/posts/${p.id}`}>
                  <div>
                    <p className={styles.fonts}>
                      {p.title ? p.title : "没有标题"}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className={styles.notBlog}>
              <div>没有博客，请发布新博客</div>
              <Link href={"/posts/new"} className={styles.posts}>
                发表博客 <span>{">>"}</span>
              </Link>
            </div>
          )}
          <footer className={styles.footer}>
            {posts.length > 0 ? pager : ""}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Myblog;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    //@ts-ignore
    const username = req.session.user?.username; //根据session获取用户id
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
        username: username || null,
      },
    };
  }
);
