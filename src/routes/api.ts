import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.json({
    message: "Welcome to Sabor y Fuego API",
    version: "1.0.0",
  });
});

router.get("/health", (_req: Request, res: Response): void => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

export default router;
