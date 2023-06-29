-- CreateTable
CREATE TABLE "ImageToItem" (
    "id" SERIAL NOT NULL,
    "imageId" INTEGER NOT NULL,

    CONSTRAINT "ImageToItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageToItem" ADD CONSTRAINT "ImageToItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
