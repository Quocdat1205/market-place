import { Request, Response } from "express";
import { error_server } from "../handler/responseHandler";

export default function LoginController(req: Request, res: Response) {
  try {
    var email = req.email;
    var pw = req.pw;

    console.log(email, pw);
  } catch (error) {
    console.error(res);
    error_server(res);
  }
}
