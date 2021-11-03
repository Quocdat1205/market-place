import { Router, Request, Response } from "express";
import { notFound } from "../handler/responseHandler";
import errorHandler from "../handler/errorHandler";

// import all routes
import routerRegister from "./register";

function Routes(app: Router) {
  app.get("/", (_req: Request, res: Response) => {
    res.send("hello world");
  });
  app.use("/api/market/v1", routerRegister);

  // router notfound and error
  app.use("*", notFound);
  app.use(errorHandler);
}

export default Routes;
