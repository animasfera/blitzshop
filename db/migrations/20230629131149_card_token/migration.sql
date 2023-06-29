-- CreateTable
CREATE TABLE "CardToken" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "invalidReason" TEXT,
    "token" TEXT NOT NULL,
    "cardLastFour" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "cardExpDate" TEXT NOT NULL,
    "feeCardTransactionCoef" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cardCountryIsoCode" TEXT NOT NULL DEFAULT 'ru',
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "CardToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CardToken_token_key" ON "CardToken"("token");

-- AddForeignKey
ALTER TABLE "CardToken" ADD CONSTRAINT "CardToken_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
