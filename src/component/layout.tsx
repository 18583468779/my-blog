import { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
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
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
