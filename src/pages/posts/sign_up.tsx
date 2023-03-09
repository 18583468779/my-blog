import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";

const SignUp: NextPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const submitFormData: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
          <label>确认密码:</label>
          <input
            type="password"
            placeholder="请再次输入密码"
            name="passwordConfirm"
            onChange={(e) =>
              setFormData({ ...formData, passwordConfirm: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
