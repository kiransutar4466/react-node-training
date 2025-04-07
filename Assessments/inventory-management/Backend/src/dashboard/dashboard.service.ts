/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as moment from "moment";

@Injectable()
export class DashboardService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(DashboardService.name);
  }

  async findInfo(vendorId: string, inventoryId: string, role: string) {
    try {
      const productStats = await this.findProductsStats(inventoryId, role);
      const categoryWiseSoldCount = await this.findCategoryWiseSoldCount(
        vendorId,
        inventoryId,
        role,
      );
      const salesPerMonthForCurrentYear =
        await this.findSalesPerMonthForCurrentYear(vendorId, inventoryId, role);
      const bestSellers = await this.findBestSellers(role);
      const totalInventory = await this.findTotalInventory(role);
      const totalOrders = await this.findTotalOrders(
        vendorId,
        inventoryId,
        role,
      );
      return {
        totalInventory,
        totalOrders,
        productStats,
        categoryWiseSoldCount,
        salesPerMonthForCurrentYear,
        bestSellers,
      };
    } catch (error) {
      this.logger.error(`Error in findInfo | ${error}`);
      throw error;
    }
  }

  // find total sellers orders
  private async findTotalOrders(
    vendorId: string,
    inventoryId: string,
    role: string,
  ) {
    try {
      const where: any = { isDeleted: false };
      if (role === "VENDOR") {
        where.inventoryId = inventoryId;
        where.inventory = { vendorId, vendor: { isDeleted: false } };
      }
      return await this.prisma.orderItem.count({
        where,
      });
    } catch (error) {
      this.logger.error(`Error in findTotalOrders | ${error}`);
      throw error;
    }
  }

  private async findTotalInventory(role: string) {
    try {
      if (role === "VENDOR") {
        return 1;
      }
      return await this.prisma.inventory.count({
        where: {
          isDeleted: false,
          vendor: { role: "VENDOR", isDeleted: false },
        },
      });
    } catch (error) {
      this.logger.error(`Error in findTotalInventory | ${error}`);
      throw error;
    }
  }

  private async findBestSellers(role: string, bestSellerCount: number = 5) {
    try {
      if (role === "VENDOR") {
        return [];
      }

      const vendors = await this.prisma.vendor.findMany({
        where: {
          isDeleted: false,
          role: "VENDOR",
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          companyName: true,
          contactNumber: true,
          address: {
            select: {
              city: true,
              pinCode: true,
            },
          },
          inventory: {
            select: {
              products: {
                where: {
                  isDeleted: false,
                },
                select: {
                  soldCount: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      const bestSellers = vendors
        .map((vendor) => {
          const soldCount =
            vendor.inventory?.products.reduce(
              (sum, product) => sum + product.soldCount,
              0,
            ) ?? 0;

          return {
            vendorId: vendor.id,
            firstName: vendor.firstName,
            lastName: vendor.lastName,
            email: vendor.email,
            companyName: vendor.companyName,
            contactNumber: vendor.contactNumber,
            city: vendor.address?.city,
            pinCode: vendor.address?.pinCode,
            soldCount,
          };
        })
        .sort((a, b) => b.soldCount - a.soldCount)
        .slice(0, bestSellerCount);

      return bestSellers;
    } catch (error) {
      this.logger.error(`Error in findBestSellers | ${error}`);
      throw error;
    }
  }

  private async findProductsStats(inventoryId: string, role: string) {
    try {
      const where: any = { isDeleted: false };
      if (role === "VENDOR") {
        where.inventoryId = inventoryId;
      }

      const totalProducts = await this.prisma.product.count({
        where,
      });

      // get total sales from orderItems (for all time)
      const totalOrderItems = await this.prisma.orderItem.findMany({
        where,
        select: {
          quantity: true,
          price: true,
        },
      });

      const totalSales = totalOrderItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      // find sales of this month from order items
      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      );
      const salesThisMonthItems = await this.prisma.orderItem.findMany({
        where: {
          ...where,
          createdAt: {
            gte: startOfMonth,
          },
        },
        select: {
          quantity: true,
          price: true,
        },
      });

      const salesThisMonth = salesThisMonthItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      return {
        totalProducts,
        totalSales,
        salesThisMonth,
      };
    } catch (error) {
      this.logger.error(`Error in findProductsStats | ${error}`);
      throw error;
    }
  }

  private async findCategoryWiseSoldCount(
    vendorId: string,
    inventoryId: string,
    role: string,
  ) {
    try {
      const where: any = {};
      if (role === "VENDOR") {
        where.vendorId = vendorId;
        where.inventoryId = inventoryId;
      }

      const products = await this.prisma.product.findMany({
        where,
        select: {
          categories: { select: { name: true } },
          soldCount: true,
        },
      });

      // store soldCount by category
      const categoryMap = {};
      for (const product of products) {
        const category = product.categories[0].name || "Other";
        categoryMap[category] =
          (categoryMap[category] || 0) + product.soldCount;
      }
      const data = Object.entries(categoryMap).map(([category, soldCount]) => ({
        category,
        soldCount,
      }));

      return data;
    } catch (error) {
      this.logger.error(`Error in findCategoryWiseSoldCount | ${error}`);
      throw error;
    }
  }

  private async findSalesPerMonthForCurrentYear(
    vendorId: string,
    inventoryId: string,
    role: string,
  ) {
    try {
      const where: any = {
        isDeleted: false,
        createdAt: {
          gte: moment().startOf("year").toDate(),
          lte: moment().endOf("year").toDate(),
        },
      };

      if (role === "VENDOR") {
        where.inventory = { vendorId };
        where.inventoryId = inventoryId;
      }

      // finding all order items of the current year
      const orderItems = await this.prisma.orderItem.findMany({
        where,
        select: {
          quantity: true,
          price: true,
          createdAt: true,
        },
      });

      // initialize month map - every month's sales as 0 (by default)
      const months: any = [];
      const salesMap: any = {};
      for (let i = 0; i < 12; i++) {
        const monthName = moment().month(i).format("MMM");
        months.push(monthName);
        salesMap[monthName] = 0;
      }

      // add sales according to the specific month
      for (const item of orderItems) {
        const monthKey = moment(item.createdAt).format("MMM");
        const itemTotalPrice = item.quantity * item.price;
        salesMap[monthKey] += itemTotalPrice;
      }

      return months.map((m) => ({
        month: m,
        totalSales: salesMap[m],
      }));
    } catch (error) {
      this.logger.error(`Error in findSalesPerMonthForCurrentYear | ${error}`);
      throw error;
    }
  }
}
