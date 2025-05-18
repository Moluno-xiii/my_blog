import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis";
const refreshTokenRoute = Router();

interface TokenPayload {
  userId: string;
}

refreshTokenRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Missing refresh token!" });
      return;
    }

    try {
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as TokenPayload;
      const storedToken = await redisClient.get(
        `session:${decodedToken.userId}`
      );

      if (storedToken !== refreshToken) throw new Error("Unauthorized token.");

      const newAccessToken = jwt.sign(
        { userId: decodedToken.userId },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: "15m" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unauthorized token.";
      res.status(401).json({ message });
      next(err);
    }
  }
);

export default refreshTokenRoute;
