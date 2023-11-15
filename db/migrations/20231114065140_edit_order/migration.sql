/*
  Warnings:

  - You are about to drop the column `shippingMethodId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `ShippingMethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `company` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryMethod` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DutyPaymentEnum" AS ENUM ('DDU', 'DDP');

-- CreateEnum
CREATE TYPE "ShippingCompanyEnum" AS ENUM ('SDEK', 'BOXBERRY');

-- CreateEnum
CREATE TYPE "DeliveryMethodEnum" AS ENUM ('DOOR', 'PICKUP');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingMethodId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingMethodId",
ADD COLUMN     "shippingCompany" "ShippingCompanyEnum",
ADD COLUMN     "shippingDutyFee" INTEGER,
ADD COLUMN     "shippingDutyPayment" "DutyPaymentEnum",
ADD COLUMN     "shippingInsurance" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shippingInsuranceFee" INTEGER,
ADD COLUMN     "shippingPackageFee" INTEGER,
ADD COLUMN     "shippingTrackingId" TEXT;

-- AlterTable
ALTER TABLE "ShippingAddress" ADD COLUMN     "cityId" INTEGER,
ADD COLUMN     "company" "ShippingCompanyEnum" NOT NULL,
ADD COLUMN     "deliveryMethod" "DeliveryMethodEnum" NOT NULL,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "provinceId" INTEGER;

-- DropTable
DROP TABLE "ShippingMethod";
