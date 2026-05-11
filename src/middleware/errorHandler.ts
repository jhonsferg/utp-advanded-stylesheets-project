import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

export const notFoundHandler = (
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
};

export const requestLogger = (req: Request, _res: Response, next: NextFunction): void => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};
