-- CreateTable
CREATE TABLE "FxRate" (
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FxRate_from_to_key" ON "FxRate"("from", "to");
