import { Router, Request, Response } from "express";
import { notFound } from "../handler/responseHandler";
import errorHandler from "../handler/errorHandler";
import logger from "../helper/logger.helper";

// import all routes
import routerRegister from "./register";
import loginRoute from "./login";

function Routes(app: Router) {
  app.get("/api/market/v1/test", (req: Request, res: Response) => {
    logger.info("test route");
    console.log(req.session);
    res.send("hello world");
  });

  app.use("/api/market/v1", loginRoute);

  app.use("/api/market/v1", routerRegister);

  // router notfound and error
  app.use("*", notFound);
  app.use(errorHandler);
}

export default Routes;
