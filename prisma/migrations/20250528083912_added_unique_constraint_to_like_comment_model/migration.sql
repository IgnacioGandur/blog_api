/*
  Warnings:

  - A unique constraint covering the columns `[commentId,userId]` on the table `LikeComment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LikeComment_commentId_userId_key" ON "LikeComment"("commentId", "userId");
