import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis";

const logoutRoute = Router();

logoutRoute.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ error: "No access token found!" });
        return;
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.decode(token) as { userId?: string };

      const userId = decoded?.userId;
      if (!userId) {
        res.status(400).json({ error: "invalid token" });
      }

      await redisClient.del(`session:${userId}`);

      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      next(err);
    }
  }
);

export default logoutRoute;
