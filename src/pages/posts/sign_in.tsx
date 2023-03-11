import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, FormEventHandler } from "react";

const SignIn: NextPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  const router = useRouter();
  const submitFormData: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios.post("/api/v1/sessions", formData).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          window.alert("登录成功");
          // router.push("/");
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
        </div>

        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
