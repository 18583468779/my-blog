import { NextPage } from "next";
import styles from "@/styles/Member.module.css";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const Member: NextPage = () => {
  const user = useAppSelector((state) => state.currentUser);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    // console.log("selectedImage", selectedImage);
    // console.log("selectedFile", selectedFile);
  }, [selectedImage, selectedFile]);

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("api/v1/image", formData);
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
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
                <img src="/images/defaultUser.svg" alt="picture" />
              </dt>
              <dd>
                <div className={styles.username}>{user.username}</div>
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
            <ul className={styles.perfectInfo}>
              <li>
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
                </div>
              </li>
              <li>
                <div onClick={handleUpload}>上传图片</div>
              </li>
              <li>
                <p>添加邮箱</p>
              </li>
              <li>
                <p>重置密码</p>
              </li>
              <li>
                <p>退出登录</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
