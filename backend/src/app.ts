import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import adminRoute from "./routes/adminRoute";
import loginRoute from "./routes/loginRoute";
import signupRoute from "./routes/signupRoute";
import logoutRoute from "./routes/logoutRoute";
import postsRoute from "./routes/postsRoute";
import verifyJWT from "./middlewares/verifyJWT";

const corsOptions = {
  origin: process.env.APP_URL || "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the home page");
});

app.use("/admin", adminRoute);
app.use("/login", loginRoute);
app.use("/logout", verifyJWT, logoutRoute);
app.use("/posts", postsRoute);
app.use("/signup", signupRoute);

app.use(errorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "route not found" });
});

app.listen(3000, () => console.log("___ listening on port 3000 ___"));
