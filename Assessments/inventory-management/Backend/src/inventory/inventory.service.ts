/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import {
  QueryFindInventorysDto,
  UpdateInventoryDto,
} from "./dto/inventory.dto";
import {
  QueryFindOrdersDto,
  UpdateOrderItemDto,
} from "src/orders/dto/orders.dto";

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
      const { page, perPage, search } = queryFindInventorysDto;
      const where: any = search
        ? {
            name: { contains: search, mode: "insensitive" },
            isDeleted: false,
            vendor: { role: "VENDOR" },
          }
        : { isDeleted: false, vendor: { role: "VENDOR" } };

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

  async findAllOrders(
    queryFindOrdersDto: QueryFindOrdersDto,
    vendorId: string,
    inventoryId: string,
  ) {
    try {
      const { page, perPage, search } = queryFindOrdersDto;
      const where: any = { inventoryId, inventory: { vendorId } };
      if (search) {
        where.product = {
          name: { contains: search, mode: "insensitive" },
        };
      }

      const skip = (page - 1) * perPage;

      const orderItems = await this.prisma.orderItem.findMany({
        where,
        skip,
        take: perPage,
        select: {
          id: true,
          productId: true,
          quantity: true,
          totalPrice: true,
          orderStatus: true,
          paymentStatus: true,
          product: { select: { name: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = orderItems.map((orderItem) => {
        const { product, ...filteredOrderItem } = {
          ...orderItem,
          productName: orderItem.product.name,
        };
        return filteredOrderItem;
      });

      const totalOrderItems = await this.prisma.orderItem.count({
        where: { inventoryId, inventory: { vendorId } },
      });

      return {
        page,
        totalPages: Math.ceil(totalOrderItems / perPage),
        prev: page > 1 ? page - 1 : null,
        next: page * perPage < totalOrderItems ? page + 1 : null,
        data,
      };
    } catch (error) {
      this.logger.error(`Error in findAllOrders | ${error}`);
      throw error;
    }
  }

  // only allowed for seller vendor
  async updateSingleOrderItem(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
    vendorId: string,
    inventoryId: string,
  ) {
    try {
      // check if orderItem exists
      const isOrderItem = await this.prisma.orderItem.findUnique({
        where: { id, inventoryId, inventory: { vendorId }, isDeleted: false },
        select: { id: true },
      });
      if (!isOrderItem) {
        throw new HttpException(
          "cannot update order item",
          HttpStatus.BAD_REQUEST,
        );
      }

      const data: any = {};
      const { orderStatus, paymentStatus } = updateOrderItemDto;
      if (orderStatus) data.orderStatus = orderStatus;
      if (paymentStatus) data.paymentStatus = paymentStatus;

      await this.prisma.orderItem.update({
        where: { id, isDeleted: false },
        data,
      });

      return { message: "cart items updated successfully" };
    } catch (error) {
      this.logger.error(`Error in update inventory | ${error}`);
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

  async update(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
    vendorId: string,
  ) {
    try {
      const inventoryFound = await this.prisma.inventory.findUnique({
        where: { id, vendorId, isDeleted: false },
        select: { isDeleted: true },
      });
      if (!inventoryFound) {
        throw new HttpException(
          "you can only update your inventory",
          HttpStatus.BAD_REQUEST,
        );
      }
      const { name, city, pinCode } = updateInventoryDto;
      const data: any = {};
      if (name) data.name = name;

      if (city || pinCode) {
        const addressData: any = {};
        if (city) addressData.city = city;
        if (pinCode) addressData.pinCode = pinCode;
        data.address = {
          update: addressData,
        };
      }
      await this.prisma.inventory.update({
        where: { id, vendorId, isDeleted: false },
        data,
      });

      return { message: "inventory updated successfully" };
    } catch (error) {
      this.logger.error(`Error in update inventory | ${error}`);
      throw error;
    }
  }

  // delete order item for seller Vendor
  async deleteOrderItem(id: string, vendorId: string, inventoryId: string) {
    try {
      const orderItem = await this.prisma.orderItem.findUnique({
        where: {
          id,
          inventoryId,
          inventory: { vendorId },
          orderStatus: { in: ["DELIVERED", "CANCELLED", "REJECTED"] },
          isDeleted: false,
        },
        select: { id: true },
      });
      if (!orderItem) {
        throw new HttpException(
          "order item cannot deleted",
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.orderItem.update({
        where: { id },
        data: { isDeleted: true },
      });
      return { message: "order item deleted successfully" };
    } catch (error) {
      this.logger.error(`Error in deleteOrderItem | ${error}`);
      throw error;
    }
  }
}
