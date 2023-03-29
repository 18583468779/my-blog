import axios from "axios";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { withSessionSsr } from "../../lib/withSession";
import queryString from "query-string";
import { useRouter } from "next/router";
import styles from "@/styles/NewPost.module.css";
import Link from "next/link";
import { useForm } from "src/hooks/useForm";
import { getUserSure } from "src/redux/features/userSlice";
import { useAppDispatch } from "src/redux/hooks";

type Props = {
  user: {
    user: {
      currentUser: boolean;
      username: string;
    };
  };
};
const SignIn: NextPage<Props> = (props) => {
  const [confirmLogin, setConfirmLogin] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    //使用cookie判断是否已经登录
    const sessions = props.user.user?.currentUser;
    if (sessions) {
      setConfirmLogin(true);
      // console.log(props);
      router.push("/");
    }
  }, []);

  const { form } = useForm({
    initFormData: { username: "", password: "" },
    fields: [
      {
        label: "用户名",
        placeholder: "请输入用户名*",
        name: "username",
        type: "text",
        key: "username",
        iconType: "userTitle",
      },
      {
        label: "密码",
        placeholder: "请输入密码*",
        name: "password",
        type: "password",
        key: "password",
        iconType: "pwdTitle",
      },
    ],
    buttons: (
      <div>
        <div className="btns">
          <button type="submit">登录</button>
        </div>
        <div className="btns">
          <button type="button">
            <Link href="/sign_up">注册</Link>
          </button>
        </div>
      </div>
    ),

    submit: {
      request: (formData) => axios.post("/api/v1/sessions", formData),
      message: () => {
        window.alert("登录成功");
        const query = queryString.parse(window.location.search);
        if (query.return_to) {
          window.location.href = query.return_to?.toString();
          // router.push(query.return_to?.toString());
        } else {
          window.location.href = "/";
          // router.push("/");
        }
        //将登录信息给store
        const state = props.user;
        dispatch(getUserSure(state));
      },
    },
  });

  return (
    <div className={styles.posts}>
      <div className={styles.postWrap}>
        <img
          src="/images/user-logo.svg"
          alt="user-title"
          width={64}
          className={styles.blogLogo}
        />
        <h1>登录</h1>
      </div>
      <div>{form}</div>
    </div>
  );
};

export default SignIn;

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
