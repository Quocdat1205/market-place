/**
 * Required External Modules
 */
import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import requestIp from "request-ip";
import session from "express-session";
import MongoStore from "connect-mongo";
import timeout from "connect-timeout";
import cookieParser from "cookie-parser";
import path from "path";

import haltOnTimedout from "./helper/requestTimeout.helper";
import ipMiddleware from "./helper/getIp.helper";
import constant from "./constant";

dotenv.config();

const mongoUrl = `mongodb+srv://${constant.DB_USERNAME_SESSION}:${constant.DB_PW_SESSION}@express.mcepu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

/** *
 * app Configuration
 */
var app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
  })
);
app.set("trust proxy", 1);
app.use(requestIp.mw());
app.use(ipMiddleware);
app.use(timeout("20s"));
app.use(haltOnTimedout);
app.use(cookieParser());
app.use("/images/market/", express.static(path.join(__dirname, "/public")));

// connect store save session
mongoose
  .connect(mongoUrl)
  .then(() => console.log("connect db mongo success"))
  .catch((err) => console.error(err));

// setup session store
app.use(
  session({
    name: "userId",
    store: MongoStore.create({ mongoUrl }),
    cookie: {
      maxAge: 1000 * 60 * 60, // one hour
      httpOnly: true, // JS front end cannot access the cookie
      secure: constant.NODE_ENV === "production", // cookie only works in https
      sameSite: false,
    },
    secret: constant.SECRET_KEY as string,
    saveUninitialized: false, // don't save empty sessions, right from the start
    resave: false,
  })
);

export default app;
