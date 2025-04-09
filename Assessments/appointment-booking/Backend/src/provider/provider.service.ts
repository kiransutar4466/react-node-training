import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProviderDto } from './provider.dto/createProvider.dto';
import * as bcrypt from 'bcrypt';
import { UpdateDto } from './provider.dto/updateProvider.dto';
import { PrismaClient } from '@prisma/client';
import { SearchQueryDto } from './provider.dto/searchQuery.dto';

@Injectable()
export class ProviderService {
  constructor(
    private prisma: PrismaClient,
    private logger: Logger,
  ) {
    this.logger = new Logger(ProviderService.name);
  }

  async create(createProviderDto: CreateProviderDto) {
    try {
      this.logger.debug(createProviderDto);

      const userFind = await this.prisma.provider.findFirst({
        where: {
          OR: [
            {
              email: createProviderDto.email,
            },
            {
              contactNo: createProviderDto.contactNo,
            },
          ],
        },
      });

      if (userFind?.email == createProviderDto.email) {
        this.logger.error('Email already exist');
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      if (userFind?.contactNo == createProviderDto.contactNo) {
        this.logger.error('Contact no already exist');
        throw new HttpException(
          'Contact no already exists',
          HttpStatus.CONFLICT,
        );
      }

      createProviderDto.password = bcrypt.hashSync(
        createProviderDto.password,
        10,
      );
      const user = await this.prisma.provider.create({
        data: createProviderDto,
      });

      const { password, createdAt, updatedAt, isDeleted, ...data } = user;
      this.logger.log(`Data is: ${JSON.stringify(data)}`);
      return {
        status: HttpStatus.OK,
        message: 'created successfully',
        result: data,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async findOne(id: string, request: any) {
    try {
      this.logger.debug('Request for find provider is', request);
      if (
        request.userRole.toLowerCase() === 'provider' &&
        request.userId != id
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      }

      const findProvider = await this.prisma.provider.findUnique({
        where: {
          id,
          isDeleted: false,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          gender: true,
          contactNo: true,
          role: true,
          address: true,
          specialization: true,
          experience: true,
          degree: true,
          isDeleted: true,
          appointments: {
            select: {
              id: true,
              date: true,
              start: true,
              end: true,
              status: true,
              patient: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  gender: true,
                  contactNo: true,
                  dateOfBirth: true,
                  address: true,
                },
              },
            },
          },
        },
      });

      if (!findProvider) {
        this.logger.error('Provider not found');
        throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
      }
      return {
        status: HttpStatus.OK,
        message: 'Data fatch successfully',
        result: findProvider,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAllProviders(searchQueryDto: SearchQueryDto) {
    try {
      const provider: any = {};
      if (searchQueryDto.specialization) {
        provider.specialization = {
          contains: searchQueryDto.specialization,
          mode: 'insensitive',
        };
      }
      if (searchQueryDto.email) {
        provider.email = {
          contains: searchQueryDto.email,
          mode: 'insensitive',
        };
      }
      if (searchQueryDto.gender) {
        provider.gender = {
          equals: searchQueryDto.gender,
          mode: 'insensitive',
        };
      }
      if (searchQueryDto.firstName) {
        provider.firstName = {
          contains: searchQueryDto.firstName,
          mode: 'insensitive',
        };
      }

      const skip = (searchQueryDto.page - 1) * searchQueryDto.limit;
      const take = searchQueryDto.limit;
      const allRecords = await this.prisma.provider.count();

      const getProviders = await this.prisma.provider.findMany({
        where: provider,
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },

        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          gender: true,
          contactNo: true,
          role: true,
          address: true,
          specialization: true,
          experience: true,
          degree: true,
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Data fatch successfully ',
        result: getProviders,
        page: searchQueryDto.page,
        total: allRecords,
      };
    } catch (error) {
      this.logger.error(`Error is: ${error}`);
      throw error;
    }
  }

  async update(id: string, updateDto: UpdateDto, request: any) {
    this.logger.debug(`Data for update: ${JSON.stringify(updateDto)}`);
    this.logger.debug(`Role for update: ${request.userRole}`);
    try {
      const findProvider = await this.prisma.provider.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });
      if (!findProvider) {
        this.logger.error('Provider not found ');
        throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
      }
      if (updateDto.email || updateDto.contactNo) {
        const emailContact = await this.prisma.provider.findFirst({
          where: {
            OR: [
              {
                email: updateDto.email,
              },
              {
                contactNo: updateDto.contactNo,
              },
            ],
          },
        });
        if (
          (emailContact && emailContact.id != id) ||
          emailContact?.contactNo != updateDto.contactNo
        ) {
          this.logger.error('Email is already exist ');
          throw new HttpException(
            'Email is already exist', 
            HttpStatus.CONFLICT,
          );
        }
      }

      if (updateDto.password) {
        updateDto.password = bcrypt.hashSync(updateDto.password, 10);
      }
      if (
        updateDto.role &&
        request.userRole.toLowerCase() === 'provider'
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      }
      await this.prisma.provider.update({
        where: {
          id,
          isDeleted: false,
        },
        data: updateDto,
      });
      this.logger.log(`Successfully updated data`);
      return { status: HttpStatus.OK, message: 'Successfully updated' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const isProviderAvailable = await this.prisma.provider.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });
      if (!isProviderAvailable) {
        this.logger.error('Provider not found ');
        throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const futureAppointments = await this.prisma.appointment.findMany({
        where: {
          providerId: id,
          date: {
            gte: today,
          },
        },
        select: {
          id: true,
        },
      });
      this.logger.debug(
        'future appointments of provider is ',
        futureAppointments,
      );
      const appointmentIds = futureAppointments.map((a) => a.id);
      this.logger.debug('future appointments of provider is ', appointmentIds);
      await this.prisma.appointment.deleteMany({
        where: {
          id: { in: appointmentIds },
        },
      });

      const futureSlots = await this.prisma.slots.deleteMany({
        where: {
          providerId: id,
          avalibility: {
            date: {
              gte: today,
            },
          },
        },
      });
      this.logger.debug('Provider slots are', futureSlots);
      const availabilities = await this.prisma.avalibility.findMany({
        where: {
          providerId: id,
          date: {
            gte: today,
          },
        },
        select: {
          id: true,
        },
      });
      const availabilityIds = availabilities.map((a) => a.id);
      this.logger.debug(
        'Future availabilities of provider is ',
        availabilityIds,
      );

      await this.prisma.avalibility.deleteMany({
        where: {
          id: {
            in: availabilityIds,
          },
        },
      });
      await this.prisma.patient.updateMany({
        where: { providerId: id },
        data: { providerId: null },
      });

      await this.prisma.provider.update({
        where: {
          id,
        },
        data: { isDeleted: true },
      });

      this.logger.log('Deleted Successfully');
      return { status: HttpStatus.OK, message: 'Deleted Successfully' };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
