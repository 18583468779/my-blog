import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/NewPost.module.css";
import { getDataSource } from "/data-source";
import { Post } from "/entities/Post";
import { User } from "/entities/User";
import { useForm } from "/hooks/useForm";
import { useAppSelector } from "/redux/hooks";

type Props = {
  post: Post;
  user: User;
  id: number;
};
const PostsEdit: NextPage<Props> = (props) => {
  const { post, id } = props;
  const users = useAppSelector((state) => state.currentUser);
  const router = useRouter();
  const { form } = useForm({
    initFormData: { title: post.title, content: post.content, id: id },
    fields: [
      {
        label: "标题",
        placeholder: "请输入标题*",
        name: "postname",
        type: "text",
        key: "title",
        iconType: "title",
      },
      {
        label: "内容",
        placeholder: "请输入内容*",
        name: "content",
        type: "textarea",
        key: "content",
        iconType: "textTitle",
      },
    ],
    buttons: (
      <div className="btns">
        <button type="submit">提交</button>
        <button type="button" style={{ marginTop: "20px" }}>
          <Link href={"/posts/myblog"}>退出</Link>
        </button>
      </div>
    ),
    submit: {
      request: (formData) => axios.post("/api/v1/edit", formData),
      message: () => {
        window.alert("提交成功！！");
        // window.location.href = "/posts";
        router.push("/posts/myblog");
      },
    },
  });
  return (
    <>
      {users.currentUser ? (
        <div className={styles.posts}>
          <div className={["container", styles.postWrap].join(" ")}>
            <img
              src="/images/blog-logo.png"
              alt="blog-title"
              width={64}
              className={styles.blogLogo}
            />
            <h1>请编辑你的博客</h1>
            {form}
          </div>
        </div>
      ) : (
        <div className="container">
          <style jsx>
            {`
              .noLogin {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                flex-direction: column;
              }
              h2 {
                text-align: center;
                font-size: 28px;
              }
            `}
          </style>
          <div className="noLogin">
            <h2>您还没有进行登录</h2>
            <div className={"btn"}>
              <Link href={"/sign_in"}>
                前往登录页面 <span>{">>"}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostsEdit;

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async (context) => {
  const AppDataSource = await getDataSource();
  const postRepository = AppDataSource.getRepository(Post);
  const post = await postRepository.findOneBy({
    id: parseInt(context.params.id),
  });
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: post.authorId,
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      user: JSON.parse(JSON.stringify(user)),
      id: context.params.id,
    },
  };
};
