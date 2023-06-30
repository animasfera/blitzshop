-- CreateTable
CREATE TABLE "Country" (
    "id" CHAR(2) NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");
