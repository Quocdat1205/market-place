import { Request, Response, NextFunction } from "express";
import { check_field } from "../handler/requestHandler";
import {
  error_server,
  unauthorized,
  bad_request,
} from "../handler/responseHandler";
import {
  validate_email,
  validate_number,
  validate_special_string,
} from "../helper/validate.helper";

declare global {
  namespace Express {
    interface Request {
      name: string;
      email: string;
      phone: string;
      add: string;
      pw: string;
      confirm_pw: string;
    }
  }
}

export async function RegisterRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    var { name, email, phone, add, pw, confirm_pw } = req.body;

    if (pw !== confirm_pw) {
      return bad_request(
        res,
        "Please check pw and confirm pw",
        "Pw and confirm pw does not match"
      );
    }

    // check field request
    let field = ["name", "email", "phone", "add", "pw", "confirm_pw"];
    let error = check_field(field, req.body);

    if (error.length > 0) {
      return unauthorized(res, error);
    }
    // end check field request

    // validate request
    let check_email = validate_email(email);
    let check_name = validate_special_string(name);
    let check_phone = validate_number(phone);
    let check_add = validate_special_string(add);

    if ([check_email, check_name, check_phone, check_add].includes(false)) {
      return bad_request(res, "Request fail", "Argument invalid");
    }

    req.email = email.toString().trim();
    req.name = name.toString().trim();
    req.phone = phone.toString().trim();
    req.add = add.toString().trim();
    req.pw = pw.toString().trim();

    return next();
  } catch (error) {
    console.error(error);
    error_server(res);
  }
}

export async function authOtp(req: Request, res: Response, next: NextFunction) {
  try {
    var { otp } = req.body;

    // check field request
    let field = ["otp"];
    let error = check_field(field, req.body);

    if (error.length > 0) {
      return unauthorized(res, error);
    }
    // end check field request

    if (isNaN(otp)) {
      return bad_request(res, "Request fail", "Argument invalid");
    }

    return next();
  } catch (error) {
    console.error(error);
    error_server(res);
  }
}
