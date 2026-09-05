import { Router } from 'express';
import multer from 'multer';
import {
  getDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
} from '../controllers/documents.js';
import { auth } from '../middleware/auth.js';

const documentsRouter = Router();

documentsRouter.use(auth);

const upload = multer({ dest: 'uploads/' });
documentsRouter.post('/', upload.single('file'), uploadDocument);
documentsRouter.get('/', getDocuments);

documentsRouter.get('/:id', getDocument);
documentsRouter.post('/', uploadDocument);
documentsRouter.delete('/:id', deleteDocument);

export { documentsRouter };
