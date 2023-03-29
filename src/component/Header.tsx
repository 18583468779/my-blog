import { NextPage } from "next";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useState } from "react";
import { useAppSelector } from "src/redux/hooks";

const Header: NextPage = (props) => {
  const users = useAppSelector((state) => state.currentUser);
  const [navMob, setNavMob] = useState(false);
  const handleNavMob = () => {
    setNavMob((state) => (state = !state));
  };
  return (
    <header className={styles.header}>
      <div className={["container", styles.container].join(" ")}>
        <div onClick={() => setNavMob(false)}>
          <Link className={styles.logoWrap} href="/">
            <img src={"/images/logo.svg"} alt="logo" width={"32px"} />
            <b>xie的博客</b>
          </Link>
        </div>
        <nav className={[styles.nav, "pc"].join(" ")}>
          <ul>
            {/* <li>
              <Link href={"/search"}>搜索</Link>
            </li> */}
            <li>
              <Link href={"/posts"}>博客广场</Link>
            </li>
            <li>
              <Link href={"/posts/new"}>写博客</Link>
            </li>
            <li>
              <Link href={"/posts/myblog"}>我的博客</Link>
            </li>

            {users.currentUser ? (
              <li>
                <h3>
                  <Link href={"/member"}> 用户：{users.username}</Link>
                </h3>
              </li>
            ) : (
              <li className={styles.users}>
                <div>
                  <Link href={"/sign_in"}>登录</Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
        <nav className={[styles.navMob, "mob"].join(" ")}>
          <span className={styles.navMobLogo} onClick={handleNavMob}></span>
          <div
            className={
              navMob
                ? [styles.navMobList, styles.navShow].join(" ")
                : styles.navMobList
            }
          >
            <ul>
              <li onClick={() => setNavMob(false)}>
                <Link href={"/posts"}>博客广场</Link>
              </li>
              <li onClick={() => setNavMob(false)}>
                <Link href={"/posts/new"}>写博客</Link>
              </li>
              <li onClick={() => setNavMob(false)}>
                <Link href={"/posts/myblog"}>我的博客</Link>
              </li>
              {users.currentUser ? (
                <li onClick={() => setNavMob(false)}>
                  <h3>
                    <Link href={"/member"}> 用户：{users.username}</Link>
                  </h3>
                </li>
              ) : (
                <li className={styles.users} onClick={() => setNavMob(false)}>
                  <div>
                    <Link href={"/sign_in"}>登录</Link>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
