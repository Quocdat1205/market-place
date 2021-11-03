"use strict";
import { Request, Response } from "express";
import constant from "../constant";
import logger from "../helper/logger.helper";

// route not found
export function notFound(req: Request, res: Response) {
  logger.info(`Request not found, ip request is ${req.ip}`);
  return res.status(constant.not_found).send("Endpoint marketplace not found!");
}

// route request get data success
export function request_success(res: Response, message?: any, data?: any) {
  return res
    .status(constant.request_success)
    .json({ success: true, message: message, data: data });
}

// route create success
export function success_create(res: Response, message?: string, data?: any) {
  return res
    .status(constant.create_success)
    .json({ success: true, message: message, data: data });
}

// The request hostname is invalid or The request could not be understood by the server due to malformed syntax.
// The client should not repeat the request without modifications
export function bad_request(res: Response, message: any, error: any) {
  return res
    .status(constant.bad_request)
    .json({ success: false, message: message, error: error });
}

// Request header not allow
export function unauthorized(
  res: Response,
  error?: any,
  message: string = "Unauthorized"
) {
  return res
    .status(constant.unauthorized_code)
    .json({ success: false, message: message, error: error });
}

// Request forbiden
export function forbiden(
  res: Response,
  error: { [key: string]: any } = {},
  message = "Forbiden"
) {
  return res
    .status(constant.forbiden)
    .json({ success: false, message: message, error: error });
}

// request not allow
export function not_allow(
  res: Response,
  error?: any,
  message?: "Request not allow"
) {
  return res.status(constant.not_allow).json({
    success: false,
    error: error,
    message: message,
  });
}

// Internal Server Error
export function error_server(
  res: Response,
  error: string = "Server have problem! Please try again later!"
) {
  return res
    .status(constant.error_server)
    .json({ success: false, error: error });
}

// Not Implemented
export function not_implement(res: Response, error: any) {
  return res
    .status(constant.not_implement)
    .json({ success: false, error: error });
}
