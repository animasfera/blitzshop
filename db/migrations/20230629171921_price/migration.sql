-- CreateTable
CREATE TABLE "Price" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "currency" "CurrencyEnum" NOT NULL DEFAULT 'RUB',

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);
