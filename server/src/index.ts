import express from 'express';

import mainRouter from "./routes/index.js";

const app = express();
const port = 3000;

// health check route
app.get("/health", (req, res): void => {
  res.status(200).json({
    "success": true,
    "data": { "status": "ok" },
    "error": null
  });
});

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});