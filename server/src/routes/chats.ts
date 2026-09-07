import { Router } from 'express';

import { auth } from '../middleware/auth.js';
import {
  getChats,
  getChat,
  createChat,
  deleteChat,
} from '../controllers/chats.js';
import { createMessage } from '../controllers/messages.js';

const chatsRouter = Router();

chatsRouter.use(auth);

chatsRouter.get('/', getChats);
chatsRouter.get('/:id', getChat);
chatsRouter.post('/', createChat);
chatsRouter.delete('/:id', deleteChat);
chatsRouter.post('/:id/messages', createMessage);

export { chatsRouter };
