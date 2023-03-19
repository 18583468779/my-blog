import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({
    username: [] as string[],
    password: [] as string[],
    passwordConfirm: [] as string[],
  });
  const router = useRouter();
  useEffect(() => {
    // console.log(formData);
  }, [formData]);
  const submitFormData: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios.post("/api/v1/users", formData).then(
      (res) => {
        console.log(res);
        if (res.status == 200) {
          window.alert("注册成功");
          // window.location.href = "/sign_in";
          router.push("/sign_in");
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
      <h1>欢迎注册</h1>
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
          <label>确认密码:</label>
          <input
            type="password"
            placeholder="请再次输入密码"
            name="passwordConfirm"
            onChange={(e) =>
              setFormData({ ...formData, passwordConfirm: e.target.value })
            }
          />
          {errors.passwordConfirm.join(",")}
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
