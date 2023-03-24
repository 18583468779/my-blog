import { NextPage } from "next";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const Header: NextPage = (props) => {
  const users = useAppSelector((state) => state.currentUser);
  return (
    <header className={styles.header}>
      <div className={["container", styles.container].join(" ")}>
        <div>
          <Link className={styles.logoWrap} href="/">
            <img src={"/images/logo.svg"} alt="logo" width={"32px"} />
            <b>xie的博客</b>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href={"/search"}>搜索</Link>
            </li>
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
      </div>
    </header>
  );
};

export default Header;
