/*
  Warnings:

  - You are about to drop the column `description` on the `ShippingMethod` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `ShippingMethod` table. All the data in the column will be lost.
  - You are about to drop the column `feeType` on the `ShippingMethod` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ShippingMethod` table. All the data in the column will be lost.
  - Added the required column `titleEn` to the `ShippingMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleRu` to the `ShippingMethod` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShippingMethod" DROP COLUMN "description",
DROP COLUMN "fee",
DROP COLUMN "feeType",
DROP COLUMN "title",
ADD COLUMN     "titleEn" TEXT NOT NULL,
ADD COLUMN     "titleRu" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ShippingFeeTypeEnum";
