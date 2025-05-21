import { Router, Request, Response, NextFunction } from "express";
import {
  getPost,
  nextError,
  getPostById,
  getSinglePost,
} from "../utils/postHelpers";
import prisma from "../prisma";

const postsRoute = Router();

postsRoute.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getPost(false);
    res.status(200).json({ posts });
  } catch (err) {
    nextError(res, next, err);
  }
});

postsRoute.get(
  "/drafts",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const drafts = await getPost(true);
      res.status(200).json({ drafts });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

postsRoute.get(
  "/singlePost/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await getSinglePost(req.params.id);
      res.status(200).json({ post });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

postsRoute.get(
  "/drafts/:draftId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const draft = await getPostById(true, req.params.draftId);
      res.status(200).json({ draft });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

postsRoute.get(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await getPostById(false, req.params.postId);
      res.status(200).json({ post });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

postsRoute.post(
  "/:postId/comments",
  async (req: Request, res: Response, next: NextFunction) => {
    const { comment_by, body } = req.body;
    try {
      const post = await prisma.comments.create({
        data: {
          body,
          comment_by,
          post_id: req.params.postId,
        },
      });
      res.status(200).json({ message: "Comment added successfully!" });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

postsRoute.get(
  "/:postId/comments",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comments = await prisma.comments.findMany({
        where: {
          post_id: req.params.PostId,
        },
      });
      res.status(200).json({ comments });
    } catch (err) {
      nextError(res, next, err);
    }
  }
);

export default postsRoute;
