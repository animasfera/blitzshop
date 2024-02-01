-- CreateTable
CREATE TABLE "DeliveryCountry" (
    "id" CHAR(2) NOT NULL,
    "code" TEXT,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "flag" TEXT
);

-- CreateTable
CREATE TABLE "DeliveryRegion" (
    "id" SERIAL NOT NULL,
    "code" INTEGER,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "countryId" CHAR(2) NOT NULL,

    CONSTRAINT "DeliveryRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryCity" (
    "id" SERIAL NOT NULL,
    "code" INTEGER,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "DeliveryCity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryCountry_id_key" ON "DeliveryCountry"("id");

-- AddForeignKey
ALTER TABLE "DeliveryRegion" ADD CONSTRAINT "DeliveryRegion_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "DeliveryCountry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryCity" ADD CONSTRAINT "DeliveryCity_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "DeliveryRegion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
