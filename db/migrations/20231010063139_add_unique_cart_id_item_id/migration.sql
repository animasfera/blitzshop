/*
  Warnings:

  - A unique constraint covering the columns `[cartId,itemId]` on the table `CartToItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartToItem_cartId_itemId_key" ON "CartToItem"("cartId", "itemId");
