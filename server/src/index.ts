import httpServer from "http";
import "reflect-metadata";
import constants from "./constant";
import logger from "./helper/logger.helper";
import app from "./app";
import Router from "./routes/index";

// all routes
Router(app);

require("./connectDB");

httpServer.createServer(app).listen(constants.PORT, (): void => {
  logger.info(`server running port ${constants.PORT}!`);
});

export default httpServer;
