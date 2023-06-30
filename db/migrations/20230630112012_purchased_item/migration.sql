/*
  Warnings:

  - You are about to drop the column `priceId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `priceId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `priceId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `amountId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_priceId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_priceId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_priceId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "priceId",
ADD COLUMN     "amountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "priceId",
ADD COLUMN     "amountId" INTEGER;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "priceId",
ADD COLUMN     "amountId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PurchasedItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amountId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "coverImageId" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "PurchasedItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_amountId_fkey" FOREIGN KEY ("amountId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_amountId_fkey" FOREIGN KEY ("amountId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_amountId_fkey" FOREIGN KEY ("amountId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_amountId_fkey" FOREIGN KEY ("amountId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedItem" ADD CONSTRAINT "PurchasedItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
