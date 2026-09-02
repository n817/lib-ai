import type { Request, Response } from 'express';

// Ask a question and get answer (POST /query)
export const query = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};