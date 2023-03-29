import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { getUserSure } from "src/redux/features/userSlice";
import { useAppDispatch } from "src/redux/hooks";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.post("/api/v1/userSure", { page: "index" }).then((res) => {
      // console.log(res, "index");
      if ((res.status = 200)) {
        //发送请求判断用户是否登录
        const objSure = Object.keys(res.data);
        if (objSure.length === 0) {
          //判断值是否为空
          return;
        }
        dispatch(getUserSure(res.data.user));
      }
    });
  }, []);

  return (
    <>
      <Head>
        <title>谢的博客首页</title>
        <meta name="description" content="谢文的博客,blog welcome to you!" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"
        />
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
