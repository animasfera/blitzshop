/*
  Warnings:

  - You are about to drop the column `orderLogId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `OrderLog` table. All the data in the column will be lost.
  - Added the required column `logId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_orderLogId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderLogId",
ADD COLUMN     "logId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderLog" DROP COLUMN "status";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_logId_fkey" FOREIGN KEY ("logId") REFERENCES "OrderLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
