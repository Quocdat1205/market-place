import { Request, Response, NextFunction } from "express";
import { check_field } from "../handler/requestHandler";
import {
  error_server,
  unauthorized,
  bad_request,
} from "../handler/responseHandler";
import { validate_email } from "../helper/validate.helper";

export async function LoginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    var { email, password } = req.body;

    // check field request
    let field = ["email", "password"];
    let error = check_field(field, req.body);
    if (error.length > 0) {
      return unauthorized(res, error);
    }
    // end check field request

    // validate request
    let check_email = validate_email(email);
    if (!check_email) {
      return bad_request(res, "Request fail", "Email went wrong");
    }

    req.email = email.toString().trim();
    req.pw = password.toString().trim();

    return next();
  } catch (error) {
    console.error(error);
    error_server(res);
  }
}
