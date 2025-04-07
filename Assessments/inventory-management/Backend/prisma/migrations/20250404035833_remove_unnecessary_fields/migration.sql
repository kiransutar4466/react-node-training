/*
  Warnings:

  - You are about to drop the column `cart_item_status` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `CartItem` table. All the data in the column will be lost.
  - You are about to drop the column `order_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `seller_vendor_id` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_seller_vendor_id_fkey";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "cart_item_status",
DROP COLUMN "is_deleted";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "order_status",
DROP COLUMN "payment_status",
DROP COLUMN "seller_vendor_id";
