-- CreateEnum
CREATE TYPE "RefundStatusEnum" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'DECLINED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Refund" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "RefundStatusEnum" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "refundedAt" TIMESTAMP(3),
    "amountId" INTEGER NOT NULL,
    "refundMethodId" INTEGER NOT NULL,
    "processedById" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_amountId_fkey" FOREIGN KEY ("amountId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_refundMethodId_fkey" FOREIGN KEY ("refundMethodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
