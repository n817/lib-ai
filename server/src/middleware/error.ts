import type { Request, Response, NextFunction } from 'express';
import { logger as winstonLogger } from '../utils/logger.js';

function errorHandler(
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  winstonLogger.error(err.message, { stack: err.stack });

  const statusCode = err.statusCode ?? 500;
  const message =
    statusCode === 500
      ? 'An internal server error occurred. Please try again later.'
      : err.message;

  res.status(statusCode).json({
    success: false,
    data: null,
    error: message,
  });

  next();
}

function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    data: null,
    error: `No handler found for ${req.method} request to ${req.path}.`,
  });
}

export { errorHandler, notFoundHandler };
