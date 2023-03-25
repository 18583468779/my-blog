import { getDataSource } from "@/data-source";
import { Post } from "@/entities/Post";
import { User } from "@/entities/User";
import { NextPage, GetServerSideProps } from "next";
import React from "react";

type Props = {
  post: Post;
  user: User;
};
const postsShow: NextPage<Props> = (props) => {
  const { post, user } = props;
  // console.log(post, user);
  return (
    <>
      <style jsx>{`
        .container {
          padding-top: 120px;
          max-width: 1000px;
        }
        h1 {
          text-align: center;
          font-size: 24px;
        }
        article {
          margin: 30px auto;
          display: block;
        }
      `}</style>
      <div className="container">
        {post ? (
          <div>
            <h1>{post.title}</h1>
            <article
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></article>
            <p>作者：{user?.username}</p>
          </div>
        ) : (
          <div>
            <h1>您还没有博客</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default postsShow;

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
    id: post?.authorId,
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
