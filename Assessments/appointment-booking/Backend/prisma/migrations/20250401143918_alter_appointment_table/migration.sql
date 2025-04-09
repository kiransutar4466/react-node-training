/*
  Warnings:

  - Added the required column `slot_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "slot_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "Slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
