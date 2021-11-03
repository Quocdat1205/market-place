"use strict";
import { Response, Request } from "express";
import logger from "../helper/logger.helper";

class HttpException extends Error {
  statusCode?: number;
  status?: number;
  message: string;
  error: string | null;

  constructor(statusCode: number, message: string, error?: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.error = error || null;
  }
}

export default function errorHandler(
  error: HttpException,
  req: Request,
  response: Response
) {
  logger.error(`Request error, ip client request is: ${req.ip}!`);
  const status = error.statusCode || error.status || 500;

  return response.status(status).send(error);
}
