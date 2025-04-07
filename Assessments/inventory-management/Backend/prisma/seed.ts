/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from "@prisma/client";
// import * as bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

async function main() {
  // const hashedPassword: string = await bcrypt.hash("Pass@123", 10);

  const categories = [
    "Electronics",
    "VR",
    "Mobile",
    "Groceries",
    "Televisions",
    "Furniture",
    "Cars",
    "Watches",
    "Toys",
    "Fruits",
  ];

  // Ensure categories exist
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // Your vendor creation code here (same as before)...
  // Assume vendors array already created and inserted

  // Retrieve all vendors with their inventories
  const vendorsWithInventories = await prisma.vendor.findMany({
    include: {
      inventory: true,
    },
  });

  for (const vendor of vendorsWithInventories) {
    const inventory = vendor.inventory;

    if (!inventory) continue;

    for (let i = 0; i < 3; i++) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const category = await prisma.category.findUnique({
        where: { name: randomCategory },
      });

      const product = await prisma.product.create({
        data: {
          id: uuid(),
          name: `${randomCategory} Product ${i + 1} by ${vendor.firstName}`,
          description: `High quality ${randomCategory} product.`,
          price: Math.floor(Math.random() * 10000 + 100),
          quantity: Math.floor(Math.random() * 100 + 1),
          stockStatus: "IN_STOCK",
          vendorId: vendor.id,
          inventoryId: inventory.id,
          categories: {
            connect: { id: category?.id },
          },
        },
      });

      console.log(`Created product: ${product.name}`);
    }
  }
}

main()
  .then(() => {
    console.log("All products, vendors, and categories seeded.");
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
