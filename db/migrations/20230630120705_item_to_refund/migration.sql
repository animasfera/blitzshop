-- CreateTable
CREATE TABLE "ItemToRefund" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "refundId" INTEGER NOT NULL,

    CONSTRAINT "ItemToRefund_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemToRefund" ADD CONSTRAINT "ItemToRefund_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "PurchasedItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemToRefund" ADD CONSTRAINT "ItemToRefund_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "Refund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
