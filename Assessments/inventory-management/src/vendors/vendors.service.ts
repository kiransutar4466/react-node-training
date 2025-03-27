/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import {
  CreateVendorDto,
  QueryFindVendorsDto,
  UpdateVendorDto,
} from './dto/vendors.dto';

@Injectable()
export class VendorsService {
  constructor(
    private readonly logger: Logger,
    private readonly prisma: PrismaClient,
  ) {
    this.logger = new Logger(VendorsService.name);
  }

  async create(createVendorDto: CreateVendorDto) {
    try {
      this.logger.debug(createVendorDto);
      createVendorDto.email = createVendorDto.email.toLowerCase();
      const user = await this.prisma.user.findUnique({
        where: {
          email: createVendorDto.email,
        },
      });
      if (user) {
        throw new HttpException('email already exists', HttpStatus.CONFLICT);
      }

      createVendorDto.password = bcrypt.hashSync(createVendorDto.password, 10);
      await this.prisma.user.create({
        data: createVendorDto,
      });

      return {
        message: 'user created successfully',
      };
    } catch (error) {
      this.logger.error(`Error in create user | ${error}`);
      throw error;
    }
  }

  async findAll(queryFindVendorsDto: QueryFindVendorsDto) {
    try {
      const { page, perPage, firstName, email, lastName, companyName } =
        queryFindVendorsDto;

      const where: any = { role: 'VENDOR', isDeleted: false };
      if (email) {
        where.email = {
          equals: email,
          mode: 'insensitive',
        };
      }
      if (firstName) {
        where.firstName = {
          contains: firstName,
          mode: 'insensitive',
        };
      }
      if (lastName) {
        where.lastName = {
          contains: lastName,
          mode: 'insensitive',
        };
      }
      if (companyName) {
        where.companyName = {
          contains: companyName,
          mode: 'insensitive',
        };
      }

      this.logger.debug(`perPage | ${perPage}`);
      this.logger.debug(`page | ${page}`);

      let skip = 0;
      if (page) {
        skip = (page - 1) * perPage;
      }

      return await this.prisma.user.findMany({
        take: perPage,
        skip,
        where,
        omit: {
          password: true,
          isDeleted: true,
        },
      });
    } catch (error) {
      this.logger.error(`Error in findAll | ${error}`);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
          isDeleted: false,
        },
        omit: {
          password: true,
          isDeleted: true,
        },
      });
      if (!user) {
        throw new HttpException(`user not found`, HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (error) {
      this.logger.error(`Error in findOne | ${error}`);
      throw error;
    }
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });
      this.logger.debug(foundUser);
      if (!foundUser) {
        throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
      }

      this.logger.log('updateUserDto:', updateVendorDto);
      if (Object.keys(updateVendorDto).includes('email')) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: updateVendorDto.email,
            NOT: { id },
          },
        });
        if (user) {
          throw new HttpException('Email already taken', HttpStatus.CONFLICT);
        }
      }

      if (
        Object.keys(updateVendorDto).includes('password') &&
        updateVendorDto.password
      ) {
        updateVendorDto.password = bcrypt.hashSync(
          updateVendorDto.password,
          10,
        );
      }

      await this.prisma.user.update({
        where: { id },
        data: updateVendorDto,
      });

      return { message: 'user updated successfully' };
    } catch (error) {
      this.logger.error(`Error in update | ${error}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id, isDeleted: false },
      });
      if (!user) {
        throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
      }
      await this.prisma.user.update({
        where: { id },
        data: {
          isDeleted: true,
        },
      });
      return { message: 'user deleted successfully' };
    } catch (error) {
      this.logger.error(`Error in remove | ${error}`);
      throw error;
    }
  }
}
