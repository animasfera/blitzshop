/*
  Warnings:

  - You are about to drop the column `orderId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethodId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `refundMethodId` on the `Refund` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceId]` on the table `Refund` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `Refund` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_refundMethodId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "orderId",
DROP COLUMN "paymentMethodId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "invoiceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "refundMethodId",
ADD COLUMN     "invoiceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_invoiceId_key" ON "Order"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_invoiceId_key" ON "Refund"("invoiceId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
