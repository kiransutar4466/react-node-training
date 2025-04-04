/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Categories
  const categoryNames = [
    "Electronics",
    "Clothing",
    "Groceries",
    "Home",
    "Books",
    "Sports",
    "Beauty",
    "Kitchen",
    "Toys",
    "Office",
  ];

  const categories = await Promise.all(
    categoryNames.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  // Vendors
  const vendor = await prisma.vendor.upsert({
    where: { email: "vendor1@example.com" },
    update: {},
    create: {
      firstName: "Amit",
      lastName: "Sharma",
      email: "vendor1@example.com",
      password: "hashedpassword",
      companyName: "Amit Traders",
      contactNumber: "9876543210",
    },
  });

  // Inventory
  const inventory = await prisma.inventory.create({
    data: {
      name: "Main Inventory",
      vendorId: vendor.id,
    },
  });

  // Products
  const productsData = [
    {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      price: 499,
      quantity: 100,
      stockStatus: "IN_STOCK",
      vendorId: vendor.id,
      inventoryId: inventory.id,
      categoryNames: ["Electronics"],
    },
    {
      name: "Cotton T-Shirt",
      description: "Comfortable round-neck t-shirt",
      price: 299,
      quantity: 200,
      stockStatus: "IN_STOCK",
      vendorId: vendor.id,
      inventoryId: inventory.id,
      categoryNames: ["Clothing"],
    },
    {
      name: "Organic Apples",
      description: "Fresh organic apples",
      price: 150,
      quantity: 50,
      stockStatus: "IN_STOCK",
      vendorId: vendor.id,
      inventoryId: inventory.id,
      categoryNames: ["Groceries"],
    },
  ];

  for (const product of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        stockStatus: product.stockStatus,
        vendorId: product.vendorId,
        inventoryId: product.inventoryId,
        categories: {
          connect: product.categoryNames.map((name) => ({
            name,
          })),
        },
      },
    });
    console.log(`Created product: ${createdProduct.name}`);
  }
}

main()
  .then(() => {
    console.log("Seed completed.");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
