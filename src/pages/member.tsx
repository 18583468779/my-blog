import { NextPage } from "next";
import styles from "../styles/Member.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFloat } from "src/hooks/useFloat";
import { useAppSelector } from "src/redux/hooks";

const Member: NextPage = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.currentUser);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [getImage, setGetImage] = useState("");
  //控制float的var
  const [showQuit, setShowQuit] = useState(false);

  const handleQuit = () => {
    setShowQuit(true);
  };

  const { Float: FloatUser } = useFloat({
    show: showQuit,
    setShowQuit,
    initData: { ev: "quit" },
    title: "您确定要退出登录吗？",
    type: "word",
    submit: {
      request: () => axios.post("/api/v1/quitUser", { ev: "quit" }),
      message: () => {
        router.push("/");
      },
    },
  });

  useEffect(() => {
    console.log(user.currentUser);
    // if (!user.currentUser) router.push("/");
  }, [user]);

  useEffect(() => {
    if (!user.currentUser) return;
    //get user picture
    axios.post("api/v1/getImage", { data: "get_user_picture" }).then((res) => {
      if ((res.status = 200)) {
        setGetImage(res.data.image);
      }
    });
  }, [selectedImage, selectedFile, getImage]);

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("api/v1/image", formData);
      // console.log("data", data);
      if (data.done == "ok") {
        window.alert("头像上传成功");
        setUploading(false);
        setSelectedImage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.member}>
      <div className={styles.userInfo}>
        <div className="container">
          <div className={styles.userTitle}>
            <h2>Hi, {user.username}</h2>
          </div>
          <div className={styles.userInfoContainer}>
            <dl className={styles.userInfoSummery}>
              <dt>
                {getImage === "" ? (
                  <img src="/images/defaultUser.svg" alt="picture" />
                ) : (
                  <img src={`images/user/${getImage}`} alt="picture" />
                )}
              </dt>
              <dd>
                <div className={styles.username}>
                  {user.username} <span>邮箱：暂无</span>
                </div>
                <ul className={styles.details}>
                  <li>
                    <strong>0</strong>
                    <span>Posts</span>
                  </li>
                  <li>
                    <strong>0</strong>
                    <span>Followers</span>
                  </li>
                  <li>
                    <strong>0</strong>
                    <span>Following</span>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={styles.userStore}>
        <div className="container">
          <div className={styles.userStoreCon}>
            <div className={styles.logo}>
              <img src="/images/member.svg" alt="member" width={64} />
            </div>
            <h2>完善您的信息</h2>
            <div className={styles.uploadFileWrap}>
              <div className={styles.fileWrap}>
                <div className={styles.file}>
                  {selectedImage ? (
                    <img src={selectedImage} alt="userPic" width={64} />
                  ) : (
                    <button
                      className={styles.upload}
                      disabled={uploading}
                      style={{ opacity: uploading ? "0.5" : "1" }}
                    >
                      选择头像
                      <input
                        type="file"
                        name="file"
                        className={styles.fileValue}
                        onChange={({ target }) => {
                          if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                            setSelectedFile(file);
                          }
                        }}
                      />
                    </button>
                  )}
                </div>
                <div onClick={handleUpload} className={styles.uploadImage}>
                  上传图片
                </div>
              </div>
            </div>
            <ul className={styles.perfectInfo}>
              <li>
                <p>添加邮箱</p>
              </li>
              <li>
                <p>
                  <Link href={"/posts/myblog"}>我的博客</Link>
                </p>
              </li>
              <li onClick={handleQuit}>
                <p>退出登录</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showQuit ? FloatUser : ""}
    </div>
  );
};

export default Member;
