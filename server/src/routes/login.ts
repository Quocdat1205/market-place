import { Router } from "express";

// import middleware
import { LoginMiddleware } from "../middleware/loginMiddleware";

// import controller
import LoginController from "../controllers/loginController";

const loginRoute = Router();

loginRoute.post("/", [LoginMiddleware], LoginController);

export default loginRoute;
