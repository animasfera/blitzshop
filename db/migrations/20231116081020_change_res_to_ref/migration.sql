/*
  Warnings:

  - You are about to drop the column `res` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,ref]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "res",
ADD COLUMN     "ref" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_ref_key" ON "Notification"("userId", "ref");
