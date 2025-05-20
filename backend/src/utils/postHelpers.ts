import { NextFunction, Response } from "express";
import prisma from "../prisma";

function nextError(res: Response, next: NextFunction, err: unknown) {
  res.status(500).json({
    error: err instanceof Error ? err.message : "Unexpected error occurred!",
  });
  next(err);
}

async function getPost(isPostDraft: boolean) {
  try {
    return await prisma.posts.findMany({
      where: {
        isPostDraft,
      },
    });
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Unexpected error occured, could not fetch posts!"
    );
  }
}

async function getSinglePost(id: string) {
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error("Invalid post id, post not found");
    }

    return post;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Unexpected error occured, could not fetch posts!"
    );
  }
}

async function getPostById(isPostDraft: boolean, id: string) {
  try {
    const post = await prisma.posts.findUnique({
      where: {
        isPostDraft,
        id,
      },
    });

    if (!post) {
      throw new Error("Invalid post id, post not found");
    }

    return post;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? err.message
        : "Unexpected error occured, could not fetch posts!"
    );
  }
}
export { nextError, getPost, getPostById, getSinglePost };
