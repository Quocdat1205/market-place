import { Logger } from "tslog";
import constants from "../constant";

let logger: Logger;

if (constants.NODE_ENV === "production") {
  logger = new Logger({
    minLevel: "info" || "error",
    type: "json",
    displayInstanceName: true,
    displayRequestId: true,
  });
} else {
  logger = new Logger({
    minLevel: "info" || "error" || "trace" || "warn" || "fatal",
    displayInstanceName: true,
    type: "json",
    displayRequestId: true,
    displayFunctionName: true,
    // displayFilePath: "hideNodeModulesOnly",
  });
}

export default logger;
