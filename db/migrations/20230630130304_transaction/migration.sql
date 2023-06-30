-- CreateEnum
CREATE TYPE "TransactionStatusEnum" AS ENUM ('PENDING', 'PAYING', 'FINISHED', 'CANCELED', 'FAILED');

-- CreateEnum
CREATE TYPE "TransactionTypeEnum" AS ENUM ('SALE', 'REFUND', 'MANUAL_ADJUSTMENT');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "remoteTransactionId" TEXT,
    "description" TEXT NOT NULL,
    "failureReason" TEXT,
    "failReasonCode" INTEGER,
    "metadata" JSONB NOT NULL,
    "receiptUrl" TEXT,
    "status" "TransactionStatusEnum" NOT NULL DEFAULT 'PENDING',
    "type" "TransactionTypeEnum" NOT NULL,
    "amountId" INTEGER NOT NULL,
    "feeTotalId" INTEGER NOT NULL,
    "netId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_amountId_fkey" FOREIGN KEY ("amountId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_feeTotalId_fkey" FOREIGN KEY ("feeTotalId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_netId_fkey" FOREIGN KEY ("netId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
