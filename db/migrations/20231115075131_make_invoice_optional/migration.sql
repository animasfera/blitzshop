-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
