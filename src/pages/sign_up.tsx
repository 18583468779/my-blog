import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "@/styles/NewPost.module.css";
import Link from "next/link";
import { useForm } from "/hooks/useForm";
const SignUp: NextPage = () => {
  const router = useRouter();
  const { form } = useForm({
    initFormData: { username: "", password: "", passwordConfirm: "" },
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
      {
        label: "确认密码",
        placeholder: "请再次输入密码*",
        name: "passwordConfirm",
        type: "password",
        key: "passwordConfirm",
        iconType: "pwdTitle",
      },
    ],
    buttons: (
      <div>
        <div className="btns">
          <button type="submit">注册</button>
        </div>
        <div className="btns">
          <button type="button">
            <Link href="/sign_in">登录</Link>
          </button>
        </div>
      </div>
    ),

    submit: {
      request: (formData) => axios.post("/api/v1/users", formData),
      message: () => {
        window.alert("注册成功");
        router.push("/sign_in");
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
        <h1>注册</h1>
      </div>
      <div>{form}</div>
    </div>
  );
};

export default SignUp;
