import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const accessToken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[0];

  if (!accessToken)
    return res
      .status(401)
      .json({ message: "Login failed, acess token missing!" });

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );
    console.log("decoded token : ", decoded);
    next();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid or expired  token.";
    res.status(401).json({ message: message });
    next(err);
  }
}

export default verifyJWT;
