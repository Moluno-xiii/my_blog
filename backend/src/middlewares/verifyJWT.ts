import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function verifyJWT(req: Request, res: Response, next: NextFunction) {
  console.log("request headers :", req.headers.authorization);
  const accessToken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  console.log(accessToken, "accestoken");
  if (!accessToken) {
    res.status(401).json({ message: "Login failed, access token missing!" });
    return;
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );
    console.log("decoded token : ", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid or expired  token.";
    res.status(401).json({ error: message });
    next(err);
  }
}

export default verifyJWT;
