/*
  Warnings:

  - You are about to drop the column `lenght` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "lenght",
ADD COLUMN     "length" INTEGER;
