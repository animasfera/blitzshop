-- CreateEnum
CREATE TYPE "ShippingFeeTypeEnum" AS ENUM ('FIXED', 'PER_KG');

-- CreateTable
CREATE TABLE "ShippingMethod" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fee" INTEGER NOT NULL,
    "feeType" "ShippingFeeTypeEnum" NOT NULL DEFAULT 'FIXED',

    CONSTRAINT "ShippingMethod_pkey" PRIMARY KEY ("id")
);
