import type { Request, Response } from 'express';

export const getCurrentUser = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      userId: 'user_000001',
      email: 'test@test.com',
      name: 'Test User',
      createdAt: '2026-08-01T00:00:00Z',
    },
    error: null,
  });
};
``