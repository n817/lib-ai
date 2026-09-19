import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import { logger as winstonLogger } from './utils/logger.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import mainRouter from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);

// health check route
app.get('/health', (req, res): void => {
  res.status(200).json({
    success: true,
    data: { status: 'ok' },
    error: null,
  });
});

app.use(express.json());

app.use('/', mainRouter);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    winstonLogger.info('MongoDB connected');
    app.listen(PORT, () =>
      winstonLogger.info(`Server running on port ${PORT}`),
    );
  })
  .catch((err) => {
    winstonLogger.error(err.message, { stack: err.stack });
  });
