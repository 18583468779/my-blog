import { NextApiHandler, NextApiRequest } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { cwd } from "process";
import { withSessionRoute } from "../../../../lib/withSession";
import { getDataSource } from "@/data-source";
import { User } from "@/entities/User";

export const config = {
  api: {
    bodyParser: false,
  },
};

const redFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(cwd(), "/public/images/user");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  const form = formidable(options); //解析form表单
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const Image: NextApiHandler = withSessionRoute(async (req, res) => {
  try {
    await fs.readdir(path.join(cwd() + "/public", "/images/user"), (err) => {
      console.log(err);
    });
  } catch (error) {
    await fs.mkdir(path.join(cwd() + "/public", "/images/user"), (err) => {
      console.log(err);
    });
  }
  const filesData = await redFile(req, true);
  const myImage: any = filesData.files.myImage;

  //   console.log(myImage.newFilename, "filesData");

  const AppDataSource = await getDataSource();
  //@ts-ignore
  const user = req.session.user?.username;
  if (!user) {
    res.statusCode = 401;
    res.end();
    return;
  }
  //根据session用户名查询用户
  const userRepository = AppDataSource.getRepository(User);
  const hasUser = await userRepository.findOneBy({
    username: user,
  });
  hasUser.picture = myImage.newFilename; //上传图片到数据库
  await userRepository.save(hasUser);
  res.json({ done: "ok" });
});
export default Image;
