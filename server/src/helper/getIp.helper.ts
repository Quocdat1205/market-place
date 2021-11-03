import requestIp from "request-ip";
import { Request, Response, NextFunction } from "express";

// inside middleware handler
const ipMiddleware = function (
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const clientIp = requestIp.getClientIp(req);
  console.log(`Client request ip ${clientIp}`);
  next();
};

export default ipMiddleware;
