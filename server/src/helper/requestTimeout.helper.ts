import { Request, Response, NextFunction } from "express";
import constant from "../constant";

function haltOnTimedout(req: Request, res: Response, next: NextFunction) {
  if (req.timedout)
    return res.status(constant.request_timeout).send("Request timout");

  return next();
}

export default haltOnTimedout;
