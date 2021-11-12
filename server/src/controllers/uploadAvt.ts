import { Request, Response } from "express";
import { error_server, unauthorized } from "../handler/responseHandler";
import logger from "../helper/logger.helper";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AttachmentCustomer } from "../entities/index";
import { getConnection } from "typeorm";

const dir = path.join(__dirname, "../public/avts");

export default async function uploadAvt(req: Request, res: Response) {
  try {
    logger.info(`Upload avt controller`);
    var userId = req.session.userId;

    var storage = multer.diskStorage({
      destination: function (_req, _file, cb) {
        cb(null, path.join(dir));
      },
      filename: function (_req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");

        // link save img
        const attachment = uuidv4() + "-" + fileName;
        cb(null, attachment);

        // update all img is false
        getConnection()
          .createQueryBuilder()
          .update(AttachmentCustomer)
          .set({
            is_active: false,
          })
          .where("id_customer = :id_customer", { id_customer: userId })
          .execute();

        // insert image for user
        getConnection()
          .createQueryBuilder()
          .insert()
          .into(AttachmentCustomer)
          .values([{ id_customer: userId, url: attachment, is_active: true }])
          .execute();
      },
    });

    var upload = multer({
      storage: storage,
      limits: { fileSize: 3000000 },
      fileFilter: (_req, file, cb) => {
        if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
      },
    }).single("image");

    upload(req, res, (err) => {
      if (err) {
        console.error("err: ", err);
        return unauthorized(res, "Only .png, .jpg and .jpeg format allowed!");
      }

      /*Now do where ever you want to do*/
      if (!err) return res.send(200).end();
    });
  } catch (error) {
    console.error(error);
    error_server(res);
  }
}
