import { useForm } from "@/hooks/useForm";
import axios from "axios";
import { NextPage } from "next";

const postsNew: NextPage = () => {
  const { form } = useForm({
    initFormData: { title: "", content: "" },
    fields: [
      {
        label: "标题",
        placeholder: "请输入标题",
        name: "postname",
        type: "text",
        key: "title",
      },
      {
        label: "内容",
        placeholder: "请输入内容",
        name: "content",
        type: "textarea",
        key: "content",
      },
    ],
    buttons: (
      <div>
        <button type="submit">提交</button>
      </div>
    ),
    submit: {
      request: (formData) => axios.post("/api/v1/posts", formData),
      message: "提交成功",
    },
  });
  return (
    <div>
      <h1>请发布一篇博客</h1>
      {form}
    </div>
  );
};

export default postsNew;
