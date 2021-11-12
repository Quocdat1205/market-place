import { Request, Response } from "express";
import {
  error_server,
  unauthorized,
  request_success,
} from "../handler/responseHandler";
import { Items } from "../entities/index";
import { v4 as uuidv4 } from "uuid";

export function PostItem(req: Request, res: Response) {
  try {
  } catch (error) {
    console.error(error);
    error_server(res);
  }
}
