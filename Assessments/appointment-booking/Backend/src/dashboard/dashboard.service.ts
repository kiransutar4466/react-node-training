import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaClient,
    private logger: Logger,
  ) {
    this.logger = new Logger(DashboardService.name);
  }

  async findAll(request: any) {
    try {
      this.logger.debug('Request is ', request);
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      console.log('Today date is: ', today);
      if (request.userRole.toLowerCase() === 'provider') {
        const totalProvider = await this.prisma.provider.count();
        const totalPatient = await this.prisma.patient.count({
          where: {
            providerId: request.userId,
          },
        });
        const totalAppointment = await this.prisma.appointment.count({
          where: {
            providerId: request.userId,
          },
        });

        const getAppointment = await this.prisma.appointment.findMany({
          where: {
            providerId: request.userId,
            date: today,
          },
          orderBy: { date: 'asc' },
          select: {
            id: true,
            date: true,
            start: true,
            end: true,
            status: true,
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
        this.logger.debug('Total Appointments of provider is', getAppointment);

        const weekStart = startOfWeek(today, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
        this.logger.debug('Week start',weekStart);
        this.logger.debug('Week end',weekEnd);

        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        this.logger.debug('Month start',monthStart);
        this.logger.debug('Month end',monthEnd);

        const weeklyAppointments = await this.prisma.appointment.count({
          where: {
            providerId: request.userId,
            date: {
              gte: weekStart,
              lte: weekEnd,
            },
          },
        });
        this.logger.debug(
          'weekly appointment of provider is ',
          weeklyAppointments,
        );
        const monthlyAppointments = await this.prisma.appointment.count({
          where: {
            providerId: request.userId,
            date: {
              gte: monthStart,
              lte: monthEnd,
            },
          },
        });
        this.logger.debug(
          'monthly appointment of provider is ',
          monthlyAppointments,
        );

        return {
          status: HttpStatus.OK,
          message: 'Data fatch successfully',
          result: {
            today: getAppointment,
            totalProvider: totalProvider,
            totalPatient: totalPatient,
            totalAppointment: totalAppointment,
            weekly: weeklyAppointments,
            monthly: monthlyAppointments,
          },
        };
      }
      const totalProvider = await this.prisma.provider.count();
      const totalPatient = await this.prisma.patient.count();
      const totalAppointment = await this.prisma.appointment.count();
      this.logger.debug(`Total providers are ${totalProvider}`);
      this.logger.debug(`Total patients are ${totalPatient}`);
      this.logger.debug(`Total Appointments are ${totalAppointment}`);
      const getAppointment = await this.prisma.appointment.findMany({
        where: {
          providerId: request.userId,
          date: today,
        },
        orderBy: { date: 'asc' },
        select: {
          id: true,
          date: true,
          start: true,
          end: true,
          status: true,
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
      this.logger.debug('Total Appointments of Admin is', getAppointment);

      const weekStart = startOfWeek(today, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);

      const weeklyAppointments = await this.prisma.appointment.count({
        where: {
          date: {
            gte: weekStart,
            lte: weekEnd,
          },
        },
      });
      this.logger.debug('Total monthly appointment is ', weeklyAppointments);
      const monthlyAppointments = await this.prisma.appointment.count({
        where: {
          date: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
      });
      this.logger.debug('monthly appointment is ', monthlyAppointments);
      return {
        today: getAppointment,
        totalProvider: totalProvider,
        totalPatient: totalPatient,
        totalAppointment: totalAppointment,
        weekly: weeklyAppointments,
        monthly: monthlyAppointments,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }
}
