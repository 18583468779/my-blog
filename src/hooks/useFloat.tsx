import styles from "@/styles/UseFloat.module.css";
import { AxiosResponse } from "axios";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type useFloatInitData = {
  show: boolean;
  setShowQuit: Dispatch<SetStateAction<boolean>>;
  initData: {
    ev: string;
  };
  title: string;
  type: "message" | "word" | "select";
  submit?: {
    request: (data: any) => Promise<AxiosResponse>;
    message: () => void;
  };
  surePath?: string;
  sureFn?: () => void;
};

export const useFloat = (options: useFloatInitData) => {
  const { initData, title, type, submit, show, setShowQuit, sureFn, surePath } =
    options;
  //show控制hooks出现
  const [aniShow, setAniShow] = useState(true); //控制弹窗向下滑出

  useEffect(() => {
    setTimeout(() => {
      setAniShow(false);
    }, 1000);
  }, [show, aniShow, setShowQuit]);

  const handleClose = () => {
    setShowQuit(false); //关闭弹窗
    setAniShow(true);
  };
  const handleSubmit = () => {
    submit.request(initData).then(submit.message, (error) => {
      console.log("error");
    });
  };
  const handleSure = () => {
    sureFn();
    router.push(surePath);
    setShowQuit(false); //关闭弹窗
  };

  const Float = (
    <>
      {show ? (
        <div className={styles.useFloat}>
          <div
            className={
              aniShow
                ? styles.useFloatWrap
                : [styles.useFloatWrap, styles.aniDown].join(" ")
            }
          >
            <span className={styles.close} onClick={handleClose}></span>
            <div className={styles.useFloatInfo}>
              <h2>{title}</h2>
              {type === "message" ? (
                <div className={styles.useFloatBtn}>
                  <button
                    type="button"
                    className={[styles.btn, "blue"].join(" ")}
                    onClick={handleSure}
                  >
                    确认
                  </button>
                </div>
              ) : (
                <div className={styles.useFloatBtn}>
                  <button
                    type="button"
                    className={[styles.btn, "grey"].join(" ")}
                    onClick={handleClose}
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    className={[styles.btn, "blue"].join(" ")}
                    onClick={handleSubmit}
                  >
                    确认
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
  return {
    Float,
  };
};
