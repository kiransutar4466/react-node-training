/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import {
  CreateProductDto,
  QueryFindProductDto,
  UpdateProductDto,
} from "./dto/products.dto";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(ProductsService.name);
  }

  async create(createProductDto: CreateProductDto, decoded: any) {
    try {
      this.logger.debug(`createProductDto | ${createProductDto}`);
      this.logger.debug(`decoded | ${decoded}`);
      const { name, description, price, quantity, categories } =
        createProductDto;

      const stockStatus =
        quantity > 10
          ? "IN_STOCK"
          : quantity > 0
            ? "LOW_STOCK"
            : "OUT_OF_STOCK";

      const categoryData = categories.map((categoryName) => ({
        where: { name: categoryName },
        create: { name: categoryName },
      }));

      const product = await this.prisma.product.create({
        data: {
          name,
          description,
          price,
          quantity,
          stockStatus,
          categories: {
            connectOrCreate: categoryData,
          },
          inventoryId: decoded.inventoryId,
          vendorId: decoded.id,
        },
      });

      return {
        message: "product created successfully",
        data: product,
      };
    } catch (error) {
      this.logger.error(`Error in create product | ${error}`);
      throw error;
    }
  }

  async findAll(queryFindProductDto: QueryFindProductDto) {
    try {
      const {
        page,
        perPage,
        category,
        stockStatus,
        name,
        orderBy,
        sortBy,
        inventoryId,
      } = queryFindProductDto;
      const where = { isDeleted: false };
      if (category)
        where["categories"] = {
          some: {
            name: { equals: category, mode: "insensitive" },
          },
        };

      if (stockStatus) where["stockStatus"] = stockStatus;
      if (name)
        where["name"] = {
          contains: name,
          mode: "insensitive",
        };
      if (inventoryId) where["inventoryId"] = inventoryId;

      const orderFilter = sortBy && orderBy ? { [sortBy]: orderBy } : {};

      const skip = (page - 1) * perPage;
      const rawData: any = await this.prisma.product.findMany({
        where,
        skip,
        orderBy: orderFilter,
        take: perPage,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
          stockStatus: true,
          soldCount: true,
          inventoryId: true,
          inventory: {
            select: {
              name: true,
            },
          },
          categories: {
            select: {
              name: true,
            },
          },
        },
      });

      const data = rawData.map((product) => {
        const filterProduct = {
          ...product,
          categories: product.categories.map((categoryObj) => categoryObj.name),
          inventoryName: product.inventory?.name,
        };
        delete filterProduct.inventory;
        return filterProduct;
      });
      const totalCount = await this.prisma.product.count({ where });
      const totalPages = Math.ceil(totalCount / perPage);
      const prev = page > 1 ? page - 1 : null;
      const next = page < totalPages ? page + 1 : null;

      return { page, totalPages, prev, next, data };
    } catch (error) {
      this.logger.error(`Error in findAll product | ${error}`);
      throw error;
    }
  }

  async findDeadStocks(decoded, queryFindProductDto) {
    try {
      const { page, perPage } = queryFindProductDto;
      const skip = (page - 1) * perPage;
      const where = {
        isDeleted: false,
        quantity: { lte: 10 },
        vendorId: decoded.id,
      };

      const data = await this.prisma.product.findMany({
        where,
        skip,
      });
      const totalCount = await this.prisma.product.count({ where });
      const totalPages = Math.ceil(totalCount / perPage);
      const prev = page > 1 ? page - 1 : null;
      const next = page < totalPages ? page + 1 : null;

      return { page, totalPages, prev, next, data };
    } catch (error) {
      this.logger.error(`Error in findOne product | ${error}`);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id, isDeleted: false },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          quantity: true,
          stockStatus: true,
          soldCount: true,
          inventoryId: true,
          inventory: {
            select: {
              name: true,
            },
          },
          categories: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!product) {
        throw new HttpException("product not found", HttpStatus.BAD_REQUEST);
      }
      const { inventory, ...filterProduct } = {
        ...product,
        inventoryName: product.inventory?.name,
        categories: product.categories.map((categoryObj) => categoryObj.name),
      };
      return filterProduct;

      // return product;
    } catch (error) {
      this.logger.error(`Error in findOne product | ${error}`);
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const productFound = await this.prisma.product.findUnique({
        where: { id, isDeleted: false },
        select: { isDeleted: true },
      });
      this.logger.debug(productFound);
      if (!productFound) {
        throw new HttpException("product not found", HttpStatus.BAD_REQUEST);
      }
      const { name, price, description, quantity, categories } =
        updateProductDto;
      const data = {};
      if (name) data["name"] = name;
      if (price) data["price"] = price;
      if (description) data["description"] = description;
      if (categories) data["categories"] = categories;
      if (quantity) {
        data["quantity"] = quantity;
        data["stockStatus"] =
          quantity > 10
            ? "IN_STOCK"
            : quantity > 0
              ? "LOW_STOCK"
              : "OUT_OF_STOCK";
      }
      await this.prisma.product.update({
        where: { id, isDeleted: false },
        data,
      });

      return { message: "product updated successfully" };
    } catch (error) {
      this.logger.error(`Error in update product | ${error}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id, isDeleted: false },
      });
      if (!product) {
        throw new HttpException("product not found", HttpStatus.BAD_REQUEST);
      }
      await this.prisma.product.update({
        where: { id },
        data: {
          isDeleted: true,
        },
        select: { _count: true },
      });
      return { message: "product deleted successfully" };
    } catch (error) {
      this.logger.error(`Error in remove product | ${error}`);
      throw error;
    }
  }
}
