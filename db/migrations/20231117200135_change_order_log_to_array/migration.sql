/*
  Warnings:

  - You are about to drop the column `logId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `OrderLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_logId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "logId";

-- AlterTable
ALTER TABLE "OrderLog" ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "OrderLog" ADD CONSTRAINT "OrderLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLog" ADD CONSTRAINT "OrderLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
