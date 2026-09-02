import { Router } from 'express';
import {
  getDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
} from '../controllers/documents.js';

const documentsRouter = Router();

documentsRouter.get('/', getDocuments);
documentsRouter.get('/:id', getDocument);
documentsRouter.post('/', uploadDocument);
documentsRouter.delete('/:id', deleteDocument);

export { documentsRouter };
