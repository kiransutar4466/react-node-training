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
      const productStats = await this.findProductsStats(
        vendorId,
        inventoryId,
        role,
      );
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
        where.inventory = { vendorId };
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
        where: { isDeleted: false, vendor: { role: "VENDOR" } },
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

      this.logger.log(
        "Top Vendors: ",
        bestSellers.map((v) => `${v.firstName} ${v.lastName} (${v.soldCount})`),
      );

      return bestSellers;
    } catch (error) {
      this.logger.error(`Error in findBestSellers | ${error}`);
      throw error;
    }
  }

  private async findProductsStats(
    vendorId: string,
    inventoryId: string,
    role: string,
  ) {
    try {
      const where: any = { isDeleted: false };
      if (role === "VENDOR") {
        where.vendorId = vendorId;
        where.inventoryId = inventoryId;
      }

      const totalProducts = await this.prisma.product.count({ where });
      const allSales = await this.prisma.product.findMany({
        where,
        select: { soldCount: true, price: true },
      });
      // updating where clause for getting monthly sales i.e. to find sold count from 1st day of month
      where.updatedAt = {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      };
      this.logger.warn(where);
      const monthlySales = await this.prisma.product.findMany({
        where,
        select: { soldCount: true, price: true },
      });

      const totalSales = allSales.reduce(
        (totalSum, product) => totalSum + product.soldCount * product.price,
        0,
      );
      const salesThisMonth = monthlySales.reduce(
        (totalSum, product) => totalSum + product.soldCount * product.price,
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
      const where: any = { isDeleted: false };
      if (role === "VENDOR") {
        where.vendorId = vendorId;
        where.inventoryId = inventoryId;
      }

      const currentYear = moment().year();

      // generate 12 months of the current year
      const months: any = [];
      for (let i = 0; i < 12; i++) {
        const start = moment().year(currentYear).month(i).startOf("month");
        const end = moment(start).endOf("month");
        months.push({
          monthName: start.format("MMM"), // like - Jan, Feb
          start: start.toDate(),
          end: end.toDate(),
        });
      }

      // Fetch all sales for this year
      const products = await this.prisma.product.findMany({
        where: {
          ...where,
          updatedAt: {
            gte: moment().year(currentYear).startOf("year").toDate(),
            lte: moment().year(currentYear).endOf("year").toDate(),
          },
        },
        select: {
          soldCount: true,
          price: true,
          updatedAt: true,
        },
      });

      // initialize month map - every month's sales as 0 (by default)
      const monthlySalesMap = {};
      for (const m of months) {
        monthlySalesMap[m.monthName] = 0;
      }

      // group sales into months
      for (const product of products) {
        const monthKey = moment(product.updatedAt).format("MMM");
        monthlySalesMap[monthKey] += product.soldCount * product.price;
      }

      const data = months.map((m) => ({
        month: m.monthName,
        totalSales: monthlySalesMap[m.monthName],
      }));

      return data;
    } catch (error) {
      this.logger.error(`Error in findSalesPerMonthForCurrentYear | ${error}`);
      throw error;
    }
  }
}
