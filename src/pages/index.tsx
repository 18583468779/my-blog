import React from "react";
import { NextPage } from "next";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { withSessionSsr } from "../../lib/withSession";

const Home: NextPage = (props) => {
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
          <div className={styles.bannerRight}>
            <p>123</p>
            <p>ewrfew </p>
            <p>阿萨德</p>
            <p>阿斯顿撒</p>
            <button>获取登录信息</button>
          </div>
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
