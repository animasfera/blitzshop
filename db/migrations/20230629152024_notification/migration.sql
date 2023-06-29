-- CreateEnum
CREATE TYPE "NotificationTypeEnum" AS ENUM ('INFO', 'ERROR', 'SUCCESS', 'WARNING');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "viewed" BOOLEAN NOT NULL DEFAULT false,
    "closable" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "isHtml" BOOLEAN NOT NULL DEFAULT false,
    "jsonData" JSONB,
    "type" "NotificationTypeEnum" NOT NULL DEFAULT 'INFO',
    "res" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
