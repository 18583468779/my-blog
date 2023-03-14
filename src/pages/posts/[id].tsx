import { getDataSource } from "@/data-source";
import { Post } from "@/entities/Post";
import { NextPage, GetServerSideProps } from "next";
import React from "react";
import { getPosts } from "../../../lib/posts";

type Props = {
  post: Post;
};
const postsShow: NextPage<Props> = (props) => {
  const { post } = props;
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
    </div>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async (context) => {
  //   const AppDataSource = await getDataSource();
  //   const postRepository = AppDataSource.getRepository(Post);
  //   const post = await postRepository.findOneBy({
  //     id: parseInt(context.params.id),
  //   });

  const id = await getPosts();
  console.log(id, "id");
  return {
    props: {
      post: JSON.parse(JSON.stringify("")),
    },
  };
};
