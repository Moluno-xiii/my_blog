import { JwtPayload } from "jsonwebtoken";

interface User {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: string | User | JwtPayload;
  }
}
