import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { withSessionSsr } from "../../lib/withSession";
import { useSwiper } from "@/hooks/useSwiper";

const Home: NextPage = (props) => {
  const { Swiper } = useSwiper(3);

  return (
    <div className={styles.home}>
      <div className="container">
        <div className={styles.banner}>
          <div className={styles.bannerLeft}>
            <h1>欢迎来到xie的个人博客</h1>
            <div>
              <p>
                创建一个博客。与世界分享你的故事。
                <br /> 凭借专业设计的博客网站脱颖而出，可以根据您的故事进行定制
              </p>
              <div className={styles.posts}>
                <Link href={"/posts"}>
                  前往文章列表 <span>{">>"}</span>
                </Link>
              </div>
            </div>
          </div>
          {Swiper}
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session;
    return {
      props: {
        user: user,
      },
    };
  }
);
