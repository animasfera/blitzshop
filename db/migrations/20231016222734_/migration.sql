/*
  Warnings:

  - The values [ru,en] on the enum `LocaleEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LocaleEnum_new" AS ENUM ('RU', 'EN');
ALTER TABLE "User" ALTER COLUMN "locale" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "locale" TYPE "LocaleEnum_new" USING ("locale"::text::"LocaleEnum_new");
ALTER TYPE "LocaleEnum" RENAME TO "LocaleEnum_old";
ALTER TYPE "LocaleEnum_new" RENAME TO "LocaleEnum";
DROP TYPE "LocaleEnum_old";
ALTER TABLE "User" ALTER COLUMN "locale" SET DEFAULT 'EN';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "locale" SET DEFAULT 'EN';
