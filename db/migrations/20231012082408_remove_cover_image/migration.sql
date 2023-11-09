/*
  Warnings:

  - You are about to drop the column `coverImageId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_coverImageId_fkey";

-- AlterTable
ALTER TABLE "ImageToItem" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "coverImageId";
