/**
 * Required External Modules
 */
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import requestIp from "request-ip";
import ipMiddleware from "./helper/getIp.helper";
import timeout from "connect-timeout";
import haltOnTimedout from "./helper/requestTimeout.helper";
import constant from "./constant";
import flash from "connect-flash";
import session from "express-session";

/** *
 * app Configuration
 */
var app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.set("trust proxy", true);
app.use(requestIp.mw());
app.use(ipMiddleware);
app.use(timeout("20s"));
app.use(haltOnTimedout);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//express session
app.use(
  session({
    secret: constant.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

// setup session store
mongoose
  .connect(
    `mongodb+srv://${constant.DB_USERNAME_SESSION}:${constant.DB_PW_SESSION}@express.mcepu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("connect db mongo success"))
  .catch((err) => console.error(err));

export default app;
