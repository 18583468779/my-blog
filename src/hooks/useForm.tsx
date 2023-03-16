import { AxiosResponse } from "axios";
import { FormEventHandler, ReactElement, useCallback, useState } from "react";

type Filed<T> = {
  label: string;
  placeholder: string;
  name: string;
  type: "text" | "password" | "textarea";
  key: keyof T;
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
    <form onSubmit={_onSubmit}>
      {fields.map((item) => (
        <div key={item.label}>
          <label>{item.label}</label>
          {item.type === "textarea" ? (
            <textarea
              name={item.name}
              placeholder={item.placeholder}
              onChange={(e) => {
                onChange(item.key, e.target.value);
              }}
            ></textarea>
          ) : (
            <input
              type={item.type}
              placeholder={item.placeholder}
              name={item.name}
              onChange={(e) => {
                onChange(item.key, e.target.value);
              }}
            />
          )}
          {errors[item.key]?.length > 0 && (
            <div>{errors[item.key].join(",")}</div>
          )}
        </div>
      ))}
      {buttons}
    </form>
  );
  return {
    form,
  };
}
