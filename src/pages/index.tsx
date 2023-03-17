import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { NextPage } from "next";
import Link from "next/link";
import Layout from "@/component/layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>谢的博客首页</title>
        <meta name="description" content="blog app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Layout />
      <main className={styles.main}>
        <h1>欢迎来到xie的个人博客</h1>
        <p>
          <Link href={"/posts"}>文章列表</Link>
        </p>
      </main>
    </>
  );
};

export default Home;
