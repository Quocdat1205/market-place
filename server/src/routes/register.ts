import { Router } from "express";

// import middleware
import {
  RegisterRequest,
  authToken,
  authOtp,
} from "../middleware/indexMiddleware";

// import controller
import { Register, AuthEmail } from "../controllers/registerController";

const routerRegister = Router();

routerRegister.post("/register", [RegisterRequest], Register);

routerRegister.post("/authentication-email", [authToken, authOtp], AuthEmail);

export default routerRegister;
