import { Request, Response, NextFunction } from "express";
import { jwt_verify } from "../handler/jwtHandler";
import { unauthorized, error_server } from "../handler/responseHandler";

declare global {
  namespace Express {
    interface Request {
      decode: any;
    }
  }
}

export default async function authToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers && req.headers["authorization"]) {
      // split token
      const authHeader = req.headers["authorization"].split(" ");
      if (authHeader[0] !== "Bearer") {
        return unauthorized(res);
      }

      // check valid token
      let decode = jwt_verify(authHeader[1]);
      if (decode === undefined) {
        return unauthorized(res, { error: "token went wrong!" });
      }
      req.decode = decode;
      return next();
    } else {
      return unauthorized(res, { error: "token in valid" });
    }
  } catch (error) {
    console.error(error);
    error_server(res);
  }
}
