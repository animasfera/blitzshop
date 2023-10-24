-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paymentMethodId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "metadata" DROP NOT NULL,
ALTER COLUMN "paymentMethodId" DROP NOT NULL,
ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
