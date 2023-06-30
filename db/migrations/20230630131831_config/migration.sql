-- AlterTable
ALTER TABLE "User" ADD COLUMN     "configKey" TEXT;

-- CreateTable
CREATE TABLE "Config" (
    "key" TEXT NOT NULL,
    "value" TEXT,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_configKey_fkey" FOREIGN KEY ("configKey") REFERENCES "Config"("key") ON DELETE SET NULL ON UPDATE CASCADE;
