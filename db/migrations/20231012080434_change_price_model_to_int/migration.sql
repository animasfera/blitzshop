/*
  Warnings:

  - You are about to drop the column `amountId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `amountId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `amountId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `amountId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `amountId` on the `PurchasedItem` table. All the data in the column will be lost.
  - You are about to drop the column `amountId` on the `Refund` table. All the data in the column will be lost.
  - You are about to drop the column `amountId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `feeTotalId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `netId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `net` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingFee` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_amountId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_amountId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_amountId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_amountId_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedItem" DROP CONSTRAINT "PurchasedItem_amountId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_amountId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_processedById_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_amountId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_feeTotalId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_netId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "amountId",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amountId",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "amountId",
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR',
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "amountId",
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR',
ADD COLUMN     "net" INTEGER NOT NULL,
ADD COLUMN     "shippingFee" INTEGER NOT NULL,
ADD COLUMN     "subtotal" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchasedItem" DROP COLUMN "amountId",
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR',
ADD COLUMN     "net" INTEGER,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Refund" DROP COLUMN "amountId",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR',
ALTER COLUMN "processedById" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amountId",
DROP COLUMN "feeTotalId",
DROP COLUMN "netId",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR',
ADD COLUMN     "feeTotal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "net" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Price";

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
