import { NextApiHandler, NextApiRequest } from "next";
import fs from "fs";
import path from "path";
import formidable from "formidable";
import { cwd } from "process";

export const config = {
  api: {
    bodyParser: false,
  },
};

const redFile = (req: NextApiRequest, saveLocally?: boolean) => {
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

const Image: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(cwd() + "/public", "/images/user"), (err) => {
      console.log(err);
    });
  } catch (error) {
    await fs.mkdir(path.join(cwd() + "/public", "/images/user"), (err) => {
      console.log(err);
    });
  }
  redFile(req, true);
  res.json({ done: "ok" });
};
export default Image;
