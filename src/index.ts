import "dotenv/config";
import path from "node:path";
import express, { Express, Request, Response, NextFunction } from "express";

import { errorHandler, notFoundHandler, requestLogger } from "./middleware/errorHandler";
import apiRoutes from "./routes/api";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use("/api", apiRoutes);
app.use(express.static(path.join(__dirname, "../public")));
app.use(notFoundHandler);
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, (): void => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
