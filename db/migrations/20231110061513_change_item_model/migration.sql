-- DropForeignKey
ALTER TABLE "ImageToItem" DROP CONSTRAINT "ImageToItem_imageId_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "uploaded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "length" INTEGER,
ADD COLUMN     "width" INTEGER;

-- AddForeignKey
ALTER TABLE "ImageToItem" ADD CONSTRAINT "ImageToItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;