import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import {
  CreateCategoryDto,
  QueryFindCategoriesDto,
} from "./dto/categories.dto";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(CategoriesService.name);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { name: createCategoryDto.name },
        select: { name: true },
      });
      if (category) {
        throw new HttpException("category already exists", HttpStatus.CONFLICT);
      }

      await this.prisma.category.create({
        data: { name: createCategoryDto.name },
      });

      return {
        message: "category created successfully",
      };
    } catch (error) {
      this.logger.error(`Error in create category | ${error}`);
      throw error;
    }
  }

  async findAll(queryFindCategoriesDto: QueryFindCategoriesDto) {
    try {
      const { page, perPage, name } = queryFindCategoriesDto;
      const where = {};
      if (name) where["name"] = name;

      const skip = (page - 1) * perPage;
      const rawData = await this.prisma.category.findMany({
        where,
        skip,
        orderBy: {
          name: "asc",
        },
        take: perPage,
        select: {
          id: true,
          name: true,
        },
      });

      const data = rawData.map((category) => category.name);
      const totalCount = await this.prisma.category.count({ where });
      const totalPages = Math.ceil(totalCount / perPage);
      const prev = page > 1 ? page - 1 : null;
      const next = page < totalPages ? page + 1 : null;

      return { page, totalPages, prev, next, data };
    } catch (error) {
      this.logger.error(`Error in findAll | ${error}`);
      throw error;
    }
  }

  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    try {
      const productFound = await this.prisma.category.findUnique({
        where: { id },
      });
      this.logger.debug(productFound);
      if (!productFound) {
        throw new HttpException("category not found", HttpStatus.BAD_REQUEST);
      }
      await this.prisma.category.update({
        where: { id },
        data: { name: updateCategoryDto.name },
      });

      return { message: "category updated successfully" };
    } catch (error) {
      this.logger.error(`Error in update category | ${error}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
      });
      if (!category) {
        throw new HttpException("category not found", HttpStatus.BAD_REQUEST);
      }
      await this.prisma.category.delete({
        where: { id },
      });
      return { message: "category deleted successfully" };
    } catch (error) {
      this.logger.error(`Error in remove category | ${error}`);
      throw error;
    }
  }
}
