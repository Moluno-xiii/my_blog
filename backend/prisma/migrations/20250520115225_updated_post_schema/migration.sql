/*
  Warnings:

  - A unique constraint covering the columns `[comment_by]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isPostDraft` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "tags" AS ENUM ('TYPESCIPT', 'REACTJS', 'EXPRESSJS', 'NODEJS', 'FRONTEND', 'BACKEND', 'FULLSTACK', 'AUTHENTICATION', 'JWT');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "isPostDraft" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "comments_comment_by_key" ON "comments"("comment_by");
