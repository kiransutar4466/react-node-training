/*
  Warnings:

  - You are about to drop the column `is_deleted` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Avalibility` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `Slots` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "is_deleted";

-- AlterTable
ALTER TABLE "Avalibility" DROP COLUMN "is_deleted";

-- AlterTable
ALTER TABLE "Slots" DROP COLUMN "is_deleted";
