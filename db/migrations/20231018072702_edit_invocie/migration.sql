/*
  Warnings:

  - You are about to drop the column `parentItemId` on the `Invoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_originalInvoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_parentItemId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "parentItemId",
ALTER COLUMN "paidAt" DROP NOT NULL,
ALTER COLUMN "originalInvoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_originalInvoiceId_fkey" FOREIGN KEY ("originalInvoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
