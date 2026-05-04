/*
  Warnings:

  - Added the required column `blogId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CommentLvlType" AS ENUM ('MAIN', 'SUB');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "blogId" INTEGER NOT NULL,
ADD COLUMN     "commentLvl" "CommentLvlType" NOT NULL DEFAULT 'MAIN',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
