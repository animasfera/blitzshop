-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sendEmailAds" BOOLEAN,
ADD COLUMN     "sendEmailSystem" BOOLEAN NOT NULL DEFAULT true;
