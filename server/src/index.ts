import express from 'express';

import { logger } from './middleware/logger.js';
import mainRouter from "./routes/index.js";

const app = express();
const port = 3000;

app.use(logger);

// health check route
app.get("/health", (req, res): void => {
  res.status(200).json({
    "success": true,
    "data": { "status": "ok" },
    "error": null
  });
});

app.use(express.json());

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});