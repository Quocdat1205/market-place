import { Request, Response } from "express";
import { getConnection } from "typeorm";
import argon2 from "argon2";
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
import {
  CheckEmailExisting,
  CheckUserExistingUseEmail,
} from "../helper/checkExisting.helper";

export async function Register(req: Request, res: Response) {
  try {
    logger.info("Register controller");
    var email = req.email;
    var name = req.name;
    var phone = req.phone;
    var add = req.add;
    var pw = req.pw;

    /*** random otp and send to email user */
    let otp = RandomOtp();

    /** check count request */
    // insert table checkmail, will block if email request > 5 but not authentication

    let check_count_email = await CheckEmailExisting(email);

    if (check_count_email && check_count_email.count >= 5) {
      return not_implement(res, "Email spam request, please try again");
    }

    // check user existing and account is active
    const user = await CheckUserExistingUseEmail(email);

    if (user) {
      return not_allow(res, "Email existing");
    }
    // end check user existing

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

    // setup send email authentication

    let templateEmail = TemplateEmail(name, otp);
    SendEmail(email, templateEmail);

    // check user is not active
    const check_user = await connection
      .getRepository(Customers)
      .createQueryBuilder("user")
      .where("user.email = :email", {
        email: email,
      })
      .getOne();

    // generate token and response client
    let accessToken: any;
    if (!check_user) {
      // add customer but not active
      const hash_pw = await argon2.hash(pw);

      let newUser = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Customers)
        .values([
          {
            email: email,
            name: name,
            phone: phone,
            add: add,
            pw: hash_pw,
          },
        ])
        .execute();

      // create new user or update count if user can't auth email
      accessToken = jwt_sign({
        _id: [newUser.generatedMaps[0].id],
        email: email,
      });
    } else {
      // create new user or update count if user can't auth email
      accessToken = jwt_sign({
        _id: check_user.id,
        email: email,
      });
    }

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

export async function AuthEmail(req: Request, res: Response) {
  try {
    logger.info("Auth email controller");
    var { _id, email } = req.decode.decode.payload;
    var { otp } = req.body;

    // check user existing and account is active
    const user = await connection
      .getRepository(Customers)
      .createQueryBuilder("user")
      .where("user.id = :id AND user.email = :email", {
        id: _id,
        email: email,
      })
      .getOne();

    if (!user) {
      return not_allow(res, "User not found");
    }
    // end check user existing

    // find otp
    const check_otp = await connection
      .getRepository(CheckMail)
      .createQueryBuilder("check_mail")
      .where("check_mail.email = :email AND check_mail.otp = :otp", {
        email: email,
        otp: otp,
      })
      .getOne();

    if (!check_otp) {
      return not_allow(res, "Otp or email went wrong!");
    }

    // delete table check_mail
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CheckMail)
      .where("id = :id", { id: _id })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .update(Customers)
      .set({
        is_active: true,
      })
      .where("id = :id", { id: _id })
      .execute();

    return success_create(res);
  } catch (error) {
    console.error(error);
    return error_server(res);
  }
}
