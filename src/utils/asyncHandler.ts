import { NextFunction, Request, Response } from "express";
import { MulterRequest } from "../controllers/user.controller";

/**
 * Helper utility
 * Standardise error & response
 *
 * Higher order function.
 * Log of get and post request.
 * We will have to create try & catch because errors can happen.
 * Some may be asynchronous.
 *
 *
 * @param requestHandler
 * @returns
 */

// Define a type for any function that could be a request handler
export type RequestHandler<T extends Request = Request> = (
  req: T,
  res: Response,
  next?: NextFunction
) => Promise<any> | any;

/*

const asyncHandler = (
  requestHandler: (
    p1?: MulterRequest | Request,
    p2?: Response,
    p3?: NextFunction
  ) => {}
) => {
  return (req: MulterRequest | Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

*/

const asyncHandler = <T extends Request>(requestHandler: RequestHandler<T>) => {
  return (req: T, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
