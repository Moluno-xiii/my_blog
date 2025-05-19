import { Router, Request, Response } from "express";
import { signUp } from "../utils/auth";
const signupRoute = Router();

signupRoute.post("/", signUp);

export default signupRoute;
