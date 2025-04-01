/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import {
  QueryFindInventorysDto,
  UpdateInventoryDto,
} from "./dto/inventory.dto";

@Injectable()
export class InventoryService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(InventoryService.name);
  }

  async findAll(queryFindInventorysDto: QueryFindInventorysDto) {
    try {
      const { page, perPage, name } = queryFindInventorysDto;
      const where = name ? { name, isDeleted: false } : { isDeleted: false };

      const skip = (page - 1) * perPage;
      const rawData = await this.prisma.inventory.findMany({
        where,
        skip,
        orderBy: {
          name: "asc",
        },
        take: perPage,
        select: {
          id: true,
          name: true,
          vendor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          address: {
            select: {
              city: true,
              pinCode: true,
            },
          },
          products: {
            select: {
              quantity: true,
            },
          },
        },
      });

      const data = rawData.map((inventory) => {
        const { address, vendor, products, ...filteredInventory } = {
          ...inventory,
          city: inventory.address?.city,
          pinCode: inventory.address?.pinCode,
          vendorName: `${inventory.vendor?.firstName} ${inventory.vendor?.lastName}`,
          totalStocks: inventory.products.reduce(
            (acc, product) => acc + product.quantity,
            0,
          ),
        };
        return filteredInventory;
      });
      const totalCount = await this.prisma.inventory.count({ where });
      const totalPages = Math.ceil(totalCount / perPage);
      const prev = page > 1 ? page - 1 : null;
      const next = page < totalPages ? page + 1 : null;

      return { page, totalPages, prev, next, data };
    } catch (error) {
      this.logger.error(`Error in findAll | ${error}`);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const inventory = await this.prisma.inventory.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          vendor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          address: {
            select: {
              city: true,
              pinCode: true,
            },
          },
          products: {
            select: {
              quantity: true,
            },
          },
        },
      });
      if (!inventory) {
        throw new HttpException("inventory not found", HttpStatus.BAD_REQUEST);
      }

      const { address, vendor, products, ...filteredInventory } = {
        ...inventory,
        city: inventory.address?.city,
        pinCode: inventory.address?.pinCode,
        vendorName: `${inventory.vendor?.firstName} ${inventory.vendor?.lastName}`,
        totalStocks: inventory.products.reduce(
          (acc, product) => acc + product.quantity,
          0,
        ),
      };
      return filteredInventory;
    } catch (error) {
      this.logger.error(`Error in findOne inventory | ${error}`);
      throw error;
    }
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto) {
    try {
      const inventoryFound = await this.prisma.inventory.findUnique({
        where: { id, isDeleted: false },
        select: { isDeleted: true },
      });
      if (!inventoryFound) {
        throw new HttpException("inventory not found", HttpStatus.BAD_REQUEST);
      }
      const { name, city, pinCode } = updateInventoryDto;
      const data = {};
      if (name) data["name"] = name;

      if (city || pinCode) {
        const addressData = {};
        if (city) addressData["city"] = city;
        if (pinCode) addressData["pinCode"] = pinCode;
        data["address"] = {
          update: addressData,
        };
      }
      await this.prisma.inventory.update({
        where: { id, isDeleted: false },
        data,
      });

      return { message: "inventory updated successfully" };
    } catch (error) {
      this.logger.error(`Error in update inventory | ${error}`);
      throw error;
    }
  }
}
