import verifyJWT from "../middlewares/verifyJWT";
import { Router, Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { nextError } from "../utils/postHelpers";
const adminRoute = Router();

adminRoute.post("/", verifyJWT, (req: Request, res: Response) => {
  res.json({ message: "admin route" });
});

adminRoute.get(
  "/",
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ user: (req as any).user });
  }
);

adminRoute.post(
  "/create-post",
  verifyJWT,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, body, isPostDraft } = req.body;
    try {
      await prisma.posts.create({
        data: {
          title,
          body,
          isPostDraft,
        },
      });
      res.status(200).json({ message: "Post created successfully!" });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

adminRoute.put(
  "/update-post/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, body, isPostDraft } = req.body;
    try {
      await prisma.posts.update({
        where: {
          id: req.params.id,
        },
        data: {
          title,
          body,
          isPostDraft,
        },
      });
      res.status(200).json({ message: "Post updated sucessfully" });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

adminRoute.delete(
  "/delete-post/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.posts.delete({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Post deleted sucessfully" });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

export default adminRoute;
