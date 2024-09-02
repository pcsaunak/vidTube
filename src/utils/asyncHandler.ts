import { NextFunction, Request, Response } from "express";

const asyncHandler = (
  requestHandler: (p1: Request, p2: Response, p3?: NextFunction) => {}
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
