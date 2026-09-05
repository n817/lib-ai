import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

import { logger } from './middleware/logger.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';
import mainRouter from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(logger);

// health check route
app.get("/health", (req, res): void => {
  res.status(200).json({
    "success": true,
    "data": { "status": "ok" },
    "error": null
  });
});

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Connection error', err);
  });

app.use(express.json());

app.use("/", mainRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});