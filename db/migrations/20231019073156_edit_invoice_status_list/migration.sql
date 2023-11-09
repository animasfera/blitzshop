/*
  Warnings:

  - The values [COMPLETED,FAILED,REFUNDED,PROCESSING,AUTHORIZED,DECLINED,AWAITING_CONFIRMATION,VOIDED,ABANDONED,DISPUTED,EXPIRED] on the enum `InvoiceStatusEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceStatusEnum_new" AS ENUM ('PENDING', 'PARTIALLY_PAID', 'PAID', 'CANCELLED');
ALTER TABLE "Invoice" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invoice" ALTER COLUMN "status" TYPE "InvoiceStatusEnum_new" USING ("status"::text::"InvoiceStatusEnum_new");
ALTER TYPE "InvoiceStatusEnum" RENAME TO "InvoiceStatusEnum_old";
ALTER TYPE "InvoiceStatusEnum_new" RENAME TO "InvoiceStatusEnum";
DROP TYPE "InvoiceStatusEnum_old";
ALTER TABLE "Invoice" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
