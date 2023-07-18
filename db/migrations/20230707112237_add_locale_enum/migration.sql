/*
  Warnings:

  - The `locale` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LocaleEnum" AS ENUM ('RU', 'EN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "locale",
ADD COLUMN     "locale" "LocaleEnum" NOT NULL DEFAULT 'EN';
