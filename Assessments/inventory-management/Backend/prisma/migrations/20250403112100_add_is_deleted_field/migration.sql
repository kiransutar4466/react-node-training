-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;
