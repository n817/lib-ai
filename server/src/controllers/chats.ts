import type { Request, Response } from 'express';

// List all chats for current user (GET /chats)
export const getChats = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

// Fetch one chat by ID (GET /chats/:id)
export const getChat = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
};

// Create a new chat session (POST /chats)
export const createChat = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {},
    error: null,
  });
};

// Delete a chat (DELETE /chats/:id)
export const deleteChat = (req: Request, res: Response): void => {
  res.status(204).send();
};

// Send a message and get reply (POST /chats/:id/messages)
export const sendMessage = (req: Request, res: Response): void => {
  res.status(201).json({
    success: true,
    data: {},
    error: null,
  });
};