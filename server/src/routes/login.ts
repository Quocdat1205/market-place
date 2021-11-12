import { Router } from "express";

// import middleware
import { LoginMiddleware } from "../middleware/loginMiddleware";

// import controller
import LoginController from "../controllers/loginController";
import uploadAvt from "../controllers/uploadAvt";

const loginRoute = Router();

loginRoute.post("/log-in", [LoginMiddleware], LoginController);

loginRoute.post("/avt", uploadAvt);

export default loginRoute;
