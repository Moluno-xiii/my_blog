import { Router } from "express";
import { login } from "../utils/auth";
const loginRoute = Router();

loginRoute.post("/", login);

export default loginRoute;
