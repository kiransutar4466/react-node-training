import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaClient } from '@prisma/client';
import { SearchQueryAppointmentDto } from './dto/searchQueryAppointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaClient,
    private logger: Logger,
  ) {
    this.logger = new Logger(AppointmentService.name);
  }

  async getAllAppointment(
    searchQueryAppointmentDto: SearchQueryAppointmentDto,
    request: any,
  ) {
    try {
      console.log('searchQueryAppointmentDto', searchQueryAppointmentDto);
      if (
        request.userRole.toLowerCase() === 'provider' &&
        searchQueryAppointmentDto.providerId != request.userId
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      } 

      const appointment: any = {};

      if (searchQueryAppointmentDto.date) {
        appointment.date = new Date(searchQueryAppointmentDto.date);
      }
      if (searchQueryAppointmentDto.date && searchQueryAppointmentDto.endDate) {
        appointment.date = {
          gte: new Date(searchQueryAppointmentDto.date),
          lte: new Date(searchQueryAppointmentDto.endDate),
        };
      }

      if (searchQueryAppointmentDto.providerId) {
        appointment.providerId = searchQueryAppointmentDto.providerId;
      }
      if (searchQueryAppointmentDto.patientId) {
        appointment.patientId = searchQueryAppointmentDto.patientId;
      }

      if (
        searchQueryAppointmentDto.providerId &&
        searchQueryAppointmentDto.date
      ) {
        appointment.date = new Date(searchQueryAppointmentDto.date);
      }
      if (
        searchQueryAppointmentDto.providerId &&
        searchQueryAppointmentDto.date &&
        searchQueryAppointmentDto.endDate
      ) {
        appointment.date = {
          gte: new Date(searchQueryAppointmentDto.date),
          lte: new Date(searchQueryAppointmentDto.endDate),
        };
      }

      const skip =
        (searchQueryAppointmentDto.page - 1) * searchQueryAppointmentDto.limit;
      const take = searchQueryAppointmentDto.limit;
      const allRecords = await this.prisma.appointment.findMany();

      const getAppointment = await this.prisma.appointment.findMany({
        where: appointment,
        orderBy: { date: 'asc' },
        select: {
          id: true,
          date: true,
          start: true,
          end: true,
          status: true,
          slotId: true,
          provider: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              gender: true,
              contactNo: true,
              specialization: true,
            },
          },
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              gender: true,
              contactNo: true,
              dateOfBirth: true,
            },
          },
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'Data fatch successfully ',
        result: getAppointment,
        page: searchQueryAppointmentDto.page,
        // total: allRecords.length,
      };
    } catch (error) {
      this.logger.error(`Error is: ${error}`);
      throw error;
    }
  }

  async findOne(id: string, request: any) {
    try {
      const isAppointmentAvailable = await this.prisma.appointment.findUnique({
        where: { id },
        select: {
          id: true,
          date: true,
          start: true,
          end: true,
          status: true,
          slotId: true,
          provider: {
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
          },
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
      });

      if (!isAppointmentAvailable) {
        this.logger.error('Appointment not found');
        throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
      }

      if (
        request.userRole.toLowerCase() === 'provider'  &&
        request.userId != isAppointmentAvailable.provider.id
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      }

      return {
        status: HttpStatus.OK,
        message: 'Data fatch successfully',
        result: isAppointmentAvailable,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }

  async create(createAppointmentDto: CreateAppointmentDto, request: any) {
    try {
      if (
        request.userRole.toLowerCase() === 'provider'  &&
        request.userId != createAppointmentDto.providerId
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      }

      this.logger.debug('Create appointment details is', createAppointmentDto);
      const isProviderPresent = await this.prisma.provider.findUnique({
        where: {
          id: createAppointmentDto.providerId,
          isDeleted: false,
        },
      });
      if (!isProviderPresent) {
        this.logger.error('Provider not found ');
        throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
      }
      const isPatientPresent = await this.prisma.patient.findUnique({
        where: {
          id: createAppointmentDto.patientId,
          isDeleted: false,
        },
      });
      if (!isPatientPresent) {
        this.logger.error('Patient not found ');
        throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
      }
      const isSlotAvailable = await this.prisma.slots.findUnique({
        where: {
          id: createAppointmentDto.slotId,
          status: 'open',
          providerId: createAppointmentDto.providerId,
        },
        include: {
          avalibility: {
            select: {
              date: true,
            },
          },
        },
      });

      if (!isSlotAvailable) {
        this.logger.error(`Slots are not availible`);
        throw new HttpException(
          'Slots are not availible',
          HttpStatus.NOT_FOUND,
        );
      }

      const checkAppointment = await this.prisma.appointment.findFirst({
        where: {
          slotId: createAppointmentDto.slotId,
          status: 'booked',
        },
      });

      this.logger.debug('check Appointment', checkAppointment);

      if (checkAppointment) {
        this.logger.error(`Slot are already booked | ${HttpStatus.CONFLICT}`);
        throw new HttpException(
          'Slot are already booked ',
          HttpStatus.CONFLICT,
        );
      }

      if (!isSlotAvailable.start || !isSlotAvailable.end) {
        throw new HttpException(
          'Slot start and end time must be provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      const conflictingAppointment = await this.prisma.appointment.findFirst({
        where: {
          patientId: createAppointmentDto.patientId,
          date: isSlotAvailable.avalibility?.date,
          status: 'booked',
          OR: [
            {
              providerId: createAppointmentDto.providerId,
            },
            {
              AND: [
                {
                  start: { lt: isSlotAvailable.end },
                },
                {
                  end: { gt: isSlotAvailable.start },
                },
              ],
            },
          ],
        },
      });

      if (conflictingAppointment) {
        this.logger.error(`Patient's appointment is already booked`);
        throw new HttpException(
          `Patient's appointment is already booked`,
          HttpStatus.CONFLICT,
        );
      }
      const appointmentData = {
        providerId: createAppointmentDto.providerId,
        patientId: createAppointmentDto.patientId,
        date: isSlotAvailable.avalibility?.date,
        start: isSlotAvailable.start,
        end: isSlotAvailable.end,
        slotId: createAppointmentDto.slotId,
        status: 'booked',
      };
      this.logger.debug('Appointment data is: ', appointmentData);
      const appointmentCreated = await this.prisma.appointment.create({
        data: appointmentData,
        omit: {
          createdAt: true,
          updatedAt: true,
        },
      });

      await this.prisma.slots.update({
        where: {
          id: createAppointmentDto.slotId,
        },
        data: {
          status: 'booked',
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'created successfully',
        result: appointmentCreated,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
    request: any,
  ) {
    try {
      this.logger.debug(
        `Data for Update Appointment: ${JSON.stringify(updateAppointmentDto)}`,
      );

      if (
        request.userRole.toLowerCase() === 'provider'  &&
        updateAppointmentDto.providerId == request.userId &&
        updateAppointmentDto.patientId
      ) {
        const findPatient = await this.prisma.patient.findUnique({
          where: {
            id: updateAppointmentDto.patientId,
            providerId: updateAppointmentDto.providerId,
          },
        });
        this.logger.debug('Find patient', findPatient);
        if (!findPatient) {
          this.logger.error(`Forbidden resource"`);
          throw new HttpException(
            'You do not have permission to access this resource',
            HttpStatus.FORBIDDEN,
          );
        }
      }

      const getAppointment = await this.prisma.appointment.findUnique({
        where: {
          id,
        },
      });

      this.logger.debug(`getAppointment', ${JSON.stringify(getAppointment)}`);

      if (!getAppointment) {
        this.logger.error(`Appointment not found`);
        throw new HttpException(`Appointment not found`, HttpStatus.NOT_FOUND);
      }
      if (updateAppointmentDto.providerId !== getAppointment.providerId) {
        throw new HttpException(
          'Provider ID mismatch with original appointment',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (!getAppointment.start || !getAppointment.end) {
        throw new HttpException(
          'Appointment start or end time is missing',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        updateAppointmentDto.providerId === getAppointment.providerId &&
        updateAppointmentDto.slotId === getAppointment.slotId &&
        updateAppointmentDto.patientId !== getAppointment.patientId
      ) {
        const conflict = await this.prisma.appointment.findFirst({
          where: {
            patientId: updateAppointmentDto.patientId,
            date: getAppointment.date,
            status: 'booked',
            AND: [
              { start: { lt: getAppointment.end } },
              { end: { gt: getAppointment.start } },
            ],
          },
        });

        if (conflict) {
          this.logger.error(`Patient's appointment is already booked`);
          throw new HttpException(
            `Patient's appointment is already booked`,
            HttpStatus.CONFLICT,
          );
        }
        const updated = await this.prisma.appointment.update({
          where: { id },
          data: {
            patientId: updateAppointmentDto.patientId,
          },
        });
        return {
          status: HttpStatus.OK,
          message: 'Updated successfully',
          data: updated,
        };
      }

      const isSlotAvailable = await this.prisma.slots.findFirst({
        where: {
          id: updateAppointmentDto.slotId,
          providerId: updateAppointmentDto.providerId,
          status: 'open',
        },
        include: {
          avalibility: { select: { date: true } },
        },
      });

      if (!isSlotAvailable) {
        this.logger.error(`Slots are not availible`);
        throw new HttpException(
          'Slots are not availible',
          HttpStatus.NOT_FOUND,
        );
      }

      if (getAppointment.slotId !== updateAppointmentDto.slotId) {
        await this.prisma.slots.update({
          where: { id: getAppointment.slotId },
          data: { status: 'open' },
        });
      }
      const updatData = {
        providerId: updateAppointmentDto.providerId,
        patientId: updateAppointmentDto.patientId,
        slotId: updateAppointmentDto.slotId,
        date: isSlotAvailable?.avalibility?.date,
        start: isSlotAvailable?.start,
        end: isSlotAvailable?.end,
        status: 'booked',
      };
      this.logger.debug('Updating data is', updatData);

      const updatedAppointment = await this.prisma.appointment.update({
        where: {
          id,
        },
        data: updatData,
      });

      await this.prisma.slots.update({
        where: {
          id: updateAppointmentDto.slotId,
        },
        data: {
          status: 'booked',
        },
      });
      return {
        status: HttpStatus.OK,
        message: 'Updated successfully',
        data: updatedAppointment,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }

  async remove(id: string, request: any) {
    try {
      const isAppointmentAvailable = await this.prisma.appointment.findUnique({
        where: {
          id,
        },
      });
      this.logger.debug(isAppointmentAvailable);
      if (!isAppointmentAvailable) {
        this.logger.error('Appointment not found');
        throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
      }
      if (
        request.userRole.toLowerCase() === 'provider' &&
        isAppointmentAvailable.providerId != request.userId
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      }

      const deletedData = await this.prisma.appointment.delete({
        where: {
          id,
        },
      });

      this.logger.debug('Deleted data:', deletedData);
      await this.prisma.slots.update({
        where: {
          id: isAppointmentAvailable.slotId,
        },
        data: {
          status: 'open',
        },
      });
      this.logger.log('Appointment Deleted Successfully');
      return {
        status: HttpStatus.OK,
        message: 'Appointment Deleted Successfully',
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }
}
