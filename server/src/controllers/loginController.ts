import { Request, Response } from "express";
import argon2 from "argon2";
import {
  error_server,
  unauthorized,
  request_success,
} from "../handler/responseHandler";
import logger from "../helper/logger.helper";
import { Customers } from "../entities/index";
import { getRepository } from "typeorm";

declare module "express-session" {
  export interface SessionData {
    userId: any;
  }
}

export default async function LoginController(req: Request, res: Response) {
  try {
    logger.info("Login controller");
    var email = req.email;
    var pw = req.pw;

    let userRepository = getRepository(Customers);

    const existingUser = await userRepository.findOne({
      where: { email: email, is_active: true },
    });
    console.log(existingUser?.id)

    if (!existingUser) {
      return unauthorized(res, "Email does not exit or account is not active");
    }

    const pwValid = await argon2.verify(existingUser.pw, pw);

    if (!pwValid) {
      return unauthorized(res, "Password invalid");
    }

    // Create session and return cookie
    req.session.userId = existingUser.id;

    return request_success(res, "Login success", existingUser);
  } catch (error) {
    console.error(error);
    return error_server(res);
  }
}
