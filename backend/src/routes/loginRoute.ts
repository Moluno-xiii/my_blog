import { Router, Request, Response } from "express";
const loginRoute = Router();

loginRoute.get("/", (req: Request, res: Response) => {
  res.json({ message: "this is the login route" });
});

export default loginRoute;
