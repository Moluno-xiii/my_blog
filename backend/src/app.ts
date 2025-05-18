import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import redisStore from "./config/redis";
import loginRoute from "./routes/loginRoute";
import signupRoute from "./routes/signupRoute";

const corsOptions = {
  origin: process.env.APP_URL || "http://localhost:5173",
  optionSuccessStatus: 200,
  credentials: true,
};

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 15,
    },
  })
);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the home page");
});
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use(errorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "route not found" });
});

app.listen(3000, () => console.log("___ listening on port 3000 ___"));
