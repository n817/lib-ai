import { Router } from 'express';
import {
  getChats,
  getChat,
  createChat,
  deleteChat,
  sendMessage,
} from '../controllers/chats.js';
import { auth } from '../middleware/auth.js';

const chatsRouter = Router();

chatsRouter.use(auth);

chatsRouter.get('/', getChats);
chatsRouter.get('/:id', getChat);
chatsRouter.post('/', createChat);
chatsRouter.delete('/:id', deleteChat);
chatsRouter.post('/:id/messages', sendMessage);

export { chatsRouter };