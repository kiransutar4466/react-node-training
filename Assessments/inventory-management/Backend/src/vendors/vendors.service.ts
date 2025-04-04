/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

import {
  CreateVendorDto,
  QueryFindVendorsDto,
  UpdateVendorDto,
} from "./dto/vendors.dto";
import { SaveCredentialsService } from "src/save-credentials/save-credentials.service";

@Injectable()
export class VendorsService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
    private readonly saveCredentialsService: SaveCredentialsService,
  ) {
    this.logger = new Logger(VendorsService.name);
  }

  private generatePassword(length: number): string {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  }

  async create(createVendorDto: CreateVendorDto) {
    try {
      this.logger.debug(createVendorDto);
      const {
        firstName,
        lastName,
        email,
        companyName,
        contactNumber,
        city,
        pinCode,
        inventoryName,
      } = createVendorDto;
      const vendor = await this.prisma.vendor.findUnique({
        where: {
          email,
        },
      });
      if (vendor) {
        throw new HttpException("email already exists", HttpStatus.CONFLICT);
      }
      let password = this.generatePassword(12);
      await this.saveCredentialsService.appendToJsonFile({ email, password });

      password = bcrypt.hashSync(password, 10);
      const data: any = await this.prisma.vendor.create({
        data: {
          firstName,
          lastName,
          email,
          password,
          companyName,
          contactNumber,
          address: {
            create: {
              city,
              pinCode,
            },
          },
          inventory: {
            create: {
              name: inventoryName,
              address: {
                create: {
                  city,
                  pinCode,
                },
              },
            },
          },
          cart: {
            create: {},
          },
        },
      });

      delete data.password;
      delete data.isDeleted;
      return {
        message: "vendor created successfully",
        data,
      };
    } catch (error) {
      this.logger.error(`Error in create vendor | ${error}`);
      throw error;
    }
  }

  async findAll(queryFindVendorsDto: QueryFindVendorsDto) {
    try {
      const { page = 1, perPage = 10, search } = queryFindVendorsDto;

      const where: any = {
        role: "VENDOR",
        isDeleted: false,
      };

      if (search) {
        const searchQuery = {
          contains: search,
          mode: "insensitive",
        };
        where.OR = [
          {
            email: searchQuery,
          },
          {
            firstName: searchQuery,
          },
          {
            lastName: searchQuery,
          },
          {
            companyName: searchQuery,
          },
        ];
      }

      const skip = (page - 1) * perPage;

      const rawData = await this.prisma.vendor.findMany({
        where,
        skip,
        take: perPage,
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
              name: true,
            },
          },
        },
      });

      const data = rawData.map((vendor) => {
        const { address, inventory, ...filteredVendor } = {
          ...vendor,
          city: vendor.address?.city,
          pinCode: vendor.address?.pinCode,
          inventoryName: vendor.inventory?.name,
        };
        return filteredVendor;
      });

      const totalCount = await this.prisma.vendor.count({ where });
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
      const rawData = await this.prisma.vendor.findUnique({
        where: {
          id,
          isDeleted: false,
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
              name: true,
            },
          },
        },
      });

      if (rawData) {
        const { address, inventory, ...filteredVendor } = {
          ...rawData,
          city: rawData.address?.city,
          pinCode: rawData.address?.pinCode,
          inventoryName: rawData.inventory?.name,
        };

        return filteredVendor;
      }
    } catch (error) {
      this.logger.error(`Error in findOne | ${error}`);
      throw error;
    }
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    try {
      if (updateVendorDto.email) {
        const existingVendor = await this.prisma.vendor.findUnique({
          where: { email: updateVendorDto.email, NOT: { id } },
        });
        if (existingVendor) {
          throw new HttpException("email already taken", HttpStatus.CONFLICT);
        }
      }

      const data = { ...updateVendorDto };

      this.logger.debug(`data for update | ${data} `);
      if (updateVendorDto.password) {
        data.password = bcrypt.hashSync(updateVendorDto.password, 10);
      }

      if (updateVendorDto.city || updateVendorDto.pinCode) {
        const addressData = {};
        if (updateVendorDto.city) addressData["city"] = updateVendorDto.city;
        if (updateVendorDto.pinCode)
          addressData["pinCode"] = updateVendorDto.pinCode;
        data["address"] = {
          upsert: {
            where: { vendorId: id },
            update: { ...addressData },
            create: { ...addressData },
          },
        };
      }

      delete data.city;
      delete data.pinCode;
      delete data.inventoryName;
      await this.prisma.vendor.update({
        where: { id },
        data,
        include: {
          address: true,
          inventory: true,
        },
      });

      return { message: "vendor updated successfully" };
    } catch (error) {
      this.logger.error(`Error in update | ${error}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.vendor.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });
      return { message: "vendor deleted successfully" };
    } catch (error) {
      this.logger.error(`Error in remove | ${error}`);
      throw error;
    }
  }
}
