import { Request, Response } from "express";
import { getConnection } from "typeorm";
import {
  error_server,
  not_allow,
  success_create,
  not_implement,
} from "../handler/responseHandler";
import { Customers, connection, CheckMail } from "../entities/index";
import RandomOtp from "../service/randomOtp";
import SendEmail from "../service/mailService";
import TemplateEmail from "../common/templateEmail";
import { jwt_sign } from "../handler/jwtHandler";
import logger from "../helper/logger.helper";

export async function Register(req: Request, res: Response) {
  try {
    logger.info("Register controller");
    var email = req.email;
    var name = req.name;
    var phone = req.phone;
    var add = req.add;

    /*** random otp and send to email user */
    let otp = RandomOtp();

    /** check count request */
    // insert table checkmail, will block if email request > 5 but not authentication

    let check_count_email = await getConnection()
      .getRepository(CheckMail)
      .createQueryBuilder("check_mail")
      .where("check_mail.email = :email", {
        email: email,
      })
      .getOne();

    if (check_count_email && check_count_email.count >= 5) {
      return not_implement(res, "Email spam request, please try again");
    }

    if (!check_count_email) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(CheckMail)
        .values([{ email: email, otp: otp, count: 1 }])
        .execute();
    } else {
      await getConnection()
        .createQueryBuilder()
        .update(CheckMail)
        .set({
          otp: otp,
          count: check_count_email.count + 1,
        })
        .where("email = :email", { email: email })
        .execute();
    }

    // end check count request

    const user = await connection
      .getRepository(Customers)
      .createQueryBuilder("user")
      .where("user.email = :email AND user.is_active", {
        email: email,
        is_active: true,
      })
      .getOne();

    if (user) {
      return not_allow(res, "Email existing");
    }

    // add customer but not active
    let newUser = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Customers)
      .values([{ email: email, name: name, phone: phone, add: add }])
      .execute();

    let templateEmail = TemplateEmail(name, otp);
    SendEmail(email, templateEmail);

    const accessToken = jwt_sign({
      _id: [newUser.generatedMaps[0].id],
      email: email,
    });
    console.log(accessToken);

    return success_create(
      res,
      "Register success, please check otp send to your email",
      {
        accessToken,
      }
    );
  } catch (error) {
    console.error(error);
    return error_server(res);
  }
}
