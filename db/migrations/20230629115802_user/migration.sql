/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- CreateEnum
CREATE TYPE "UserStatusEnum" AS ENUM ('PENDING', 'ACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "CountryFilterEnum" AS ENUM ('NONE', 'RUSSIA', 'WORLD_EXPECT_RUSSIA', 'WORLD');

-- CreateEnum
CREATE TYPE "CurrencyEnum" AS ENUM ('RUB', 'USD', 'EUR');

-- CreateEnum
CREATE TYPE "TokenTypeEnum" AS ENUM ('RESET_PASSWORD', 'CONFIRM_EMAIL', 'CONFIRM_EMAIL_LEELA_CERT');

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenTypeEnum" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "buyingInCountries" "CountryFilterEnum" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "countryIsoCode" TEXT NOT NULL DEFAULT 'ru',
ADD COLUMN     "currency" "CurrencyEnum" NOT NULL DEFAULT 'EUR',
ADD COLUMN     "emailConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en',
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" "UserStatusEnum" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Etc/Greenwich',
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRoleEnum" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
