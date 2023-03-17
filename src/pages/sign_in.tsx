import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { useState, useEffect, FormEventHandler } from "react";
import { withSessionSsr } from "../../lib/withSession";
import queryString from "query-string";

type Props = {
  user: {
    user: {
      currentUser: object;
    };
  };
};
const SignIn: NextPage<Props> = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    username: [] as string[],
    password: [] as string[],
  });
  const [confirmLogin, setConfirmLogin] = useState(false);

  useEffect(() => {
    //使用cookie判断是否已经登录
    const sessions = props.user.user?.currentUser;
    if (sessions) {
      setConfirmLogin(true);
      // console.log(props);
      // router.push("/");
    }
  }, []);

  const submitFormData: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios.post("/api/v1/sessions", formData).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          window.alert("登录成功");

          const query = queryString.parse(window.location.search);
          if (query.return_to) {
            window.location.href = query.return_to?.toString();
          } else {
            window.location.href = "/posts";
          }
        }
      },
      (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          }
        }
      }
    );
  };

  return (
    <div>
      {confirmLogin && ( //@ts-ignore
        <div>用户已登录:{props.user.user?.username}</div>
      )}

      <h1>欢迎登录</h1>
      <form onSubmit={submitFormData}>
        <div>
          <label>用户名:</label>
          <input
            type="text"
            placeholder="请输入用户名"
            name="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username.join(",")}
        </div>
        <div>
          <label>密码:</label>
          <input
            type="password"
            placeholder="请输入密码"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password.join(",")}
        </div>

        <div>
          <button type="submit">登录</button>
        </div>
      </form>
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
