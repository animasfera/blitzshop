-- CreateEnum
CREATE TYPE "InvoiceStatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PROCESSING', 'AUTHORIZED', 'DECLINED', 'PARTIALLY_PAID', 'AWAITING_CONFIRMATION', 'VOIDED', 'ABANDONED', 'DISPUTED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatusEnum" NOT NULL DEFAULT 'PENDING',
    "error" TEXT,
    "notes" TEXT,
    "amountId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "parentItemId" INTEGER NOT NULL,
    "originalInvoiceId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_amountId_fkey" FOREIGN KEY ("amountId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_parentItemId_fkey" FOREIGN KEY ("parentItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_originalInvoiceId_fkey" FOREIGN KEY ("originalInvoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
