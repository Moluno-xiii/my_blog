import { Router, Request, Response } from "express";
import verifyJWT from "../middlewares/verifyJWT";
const adminRoute = Router();

adminRoute.post("/", verifyJWT, (req: Request, res: Response) => {
  res.json({ message: "admin route" });
});

adminRoute.get("/", verifyJWT, async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});

export default adminRoute;
