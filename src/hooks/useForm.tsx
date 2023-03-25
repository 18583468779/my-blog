import { AxiosResponse } from "axios";
import { FormEventHandler, ReactElement, useCallback, useState } from "react";
import styles from "@/styles/UseForm.module.css";
type Filed<T> = {
  label: string;
  placeholder: string;
  name: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
  iconType: "title" | "textTitle" | "userTitle" | "pwdTitle";
  title?: string;
  content?: string;
};

type useFormInitData<T> = {
  initFormData: T;
  fields: Filed<T>[];
  buttons: ReactElement;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    message: () => void;
  };
};

export function useForm<T>(options: useFormInitData<T>) {
  const { initFormData, fields, buttons, submit } = options;
  // console.log(initFormData, "initFormData");
  const [initData, setInitData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  });
  const onChange = useCallback(
    (key: keyof T, value: any) => {
      setInitData({ ...initData, [key]: value });
    },
    [initData]
  );

  const _onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      submit.request(initData).then(submit.message, (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          } else if (response.status === 401) {
            window.alert("请先登录");
            window.location.href = `/sign_in/?return_to=${encodeURIComponent(
              window.location.pathname
            )}`;
          }
        }
      });
    },
    [submit, initData]
  );

  const form = (
    <div className={styles.useForm}>
      <style jsx>
        {`
          .title {
            background-image: url(/images/title.svg);
          }
          .textTitle {
            height: 20px;
            top: 10px;
            background-image: url(/images/content.svg);
          }
          .userTitle {
            background-image: url(/images/userTitle.svg);
          }
          .pwdTitle {
            background-image: url(/images/pwdTitle.svg);
          }
        `}
      </style>
      <form onSubmit={_onSubmit}>
        {fields.map((item) => (
          <div key={item.label}>
            {item.type === "textarea" ? (
              <div className={styles.textareaWrap}>
                <label className={item.iconType}></label>
                <textarea
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={(e) => {
                    onChange(item.key, e.target.value);
                  }}
                  defaultValue={(initFormData as any).content}
                ></textarea>
              </div>
            ) : (
              <div className={styles.inputWrap}>
                <label className={item.iconType}></label>
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  name={item.name}
                  onChange={(e) => {
                    onChange(item.key, e.target.value);
                  }}
                  defaultValue={(initFormData as any).title}
                />
              </div>
            )}
            {errors[item.key]?.length > 0 && (
              <div className="error">{errors[item.key].join(",")}</div>
            )}
          </div>
        ))}
        {buttons}
      </form>
    </div>
  );
  return {
    form,
  };
}
