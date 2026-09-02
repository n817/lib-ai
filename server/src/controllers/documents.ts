import type { Request, Response } from 'express';

// List documents for current user (GET /documents)
export const getDocuments = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

// Fetch a single document (GET /documents/:id)
export const getDocument = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

// Upload a document (POST /documents)
export const uploadDocument = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {},
    error: null,
  });
};

// Delete a document (DELETE /documents/:id)
export const deleteDocument = (req: Request, res: Response): void => {
  res.status(204).send();
};
