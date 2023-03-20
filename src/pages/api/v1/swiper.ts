import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";
import getConfig from "next/config";

const Swiper: NextApiHandler = async (req, res) => {
  //   try {
  //     res.setHeader("Content-Type", "image/jpg");
  //     res.statusCode = 200;
  //     fs.readdir("./public/images/swiper", (err, data) => {
  //       console.log(data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  res.write(JSON.stringify("三张轮播图"));
  res.end();
};
export default Swiper;
