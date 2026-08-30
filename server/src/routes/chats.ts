import { Router } from 'express';
import {
  getChats,
  getChat,
  createChat,
  deleteChat,
  sendMessage,
} from '../controllers/chats.js';

const chatsRouter = Router();

chatsRouter.get('/', getChats);
chatsRouter.get('/:id', getChat);
chatsRouter.post('/', createChat);
chatsRouter.delete('/:id', deleteChat);
chatsRouter.post('/:id/messages', sendMessage);

export { chatsRouter };