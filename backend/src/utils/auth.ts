import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { redisClient } from "../config/redis";

async function signUp(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.author.create({
      data: {
        email,
        hashed_password,
      },
    });
    res.status(200).json({ message: "Signup successful!" });
    console.log("newly created user:", user);
    return;
  } catch (err) {
    res.status(403).send({
      message: err instanceof Error ? err.message : "Email already exists!",
    });
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await prisma.author.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Incorrect credentials" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.hashed_password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "30d" }
    );

    await redisClient.set(`session:${user.id}`, refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send({ message: "Login successful" });
  } catch (err) {
    next(err);
  }
}
