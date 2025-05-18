import { Router, Request, Response } from "express";
const signupRoute = Router();

signupRoute.get("/", (req: Request, res: Response) => {
  res.json({ message: "this is the sign up route" });
});

export default signupRoute;
