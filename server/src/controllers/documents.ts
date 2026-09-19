import type { Request, Response } from 'express';
import { readFileSync } from 'fs';
import { PDFParse } from 'pdf-parse';

import Document from '../models/document.js';
import Chunk from '../models/chunk.js';

import { chunkText } from '../utils/chunk.js';
import { createEmbedding } from '../utils/embeddings.js';

import {
  deleteCacheValue,
  getCacheValue,
  setCacheValue,
} from '../middleware/cache.js';

// List documents for current user (GET /documents)
export const getDocuments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Retrieve the cached value
  const cacheKey = `documents-list:${req.user!.userId}`;
  const cached = getCacheValue(cacheKey);
  if (cached) {
    res.status(200).json(cached);
    return;
  }

  const userId = req.user!.userId;
  const documents = await Document.find({ userId });

  const responseData = { data: documents };

  setCacheValue(cacheKey, responseData, 30 * 1000);

  res.status(200).json({
    success: true,
    data: documents,
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
export const uploadDocument = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send({
      success: false,
      data: null,
      error: { message: 'File is required' },
    });
    return;
  }

  const buffer = readFileSync(req.file.path);
  const parser = new PDFParse({ data: buffer });
  const { text } = await parser.getText();

  const chunks = chunkText(text);

  const title = req.body.title || req.file.originalname;

  const document = await Document.create({
    title,
    fileName: req.file.originalname,
    userId: req.user!.userId,
  });

  const cacheKey = `documents-list:${req.user!.userId}`;
  deleteCacheValue(cacheKey);

  await Promise.all(
    chunks.map(async (chunk) =>
      Chunk.create({
        documentId: document._id,
        text: chunk,
        embedding: await createEmbedding(chunk),
      }),
    ),
  );

  res.status(201).send({
    success: true,
    data: document,
    error: null,
  });
};

// Delete a document (DELETE /documents/:id)
export const deleteDocument = (req: Request, res: Response): void => {
  res.status(204).send();
};
