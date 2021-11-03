import { Router } from "express";

// import middleware
import { RegisterRequest } from "../middleware/indexMiddleware";

// import controller
import { Register } from "../controllers/registerController";

const routerRegister = Router();

routerRegister.post("/register", RegisterRequest, Register);

export default routerRegister;
