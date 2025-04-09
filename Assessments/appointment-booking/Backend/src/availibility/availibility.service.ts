import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateAvailibilityDto } from './dto/createAvailibility.dto';
import { PrismaClient } from '@prisma/client';
import { SearchAvailibilityDto } from './dto/searchQuery.dto';
import { addMinutes, format, parseISO } from 'date-fns';

@Injectable()
export class AvailibilityService {
  constructor(
    private prisma: PrismaClient,
    private logger: Logger,
  ) {
    this.logger = new Logger(AvailibilityService.name);
  }

  async create(createAvailibilityDto: CreateAvailibilityDto, request: any) {
    try {
      this.logger.debug(createAvailibilityDto);

      if (
        request.userRole.toLowerCase() === 'provider'  &&
        createAvailibilityDto.providerId != request.userId
      ) {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      }

      const findProvider = await this.prisma.provider.findUnique({
        where: {
          id: createAvailibilityDto.providerId,
          isDeleted: false,
        },
      });
      if (!findProvider) {
        this.logger.error(`Provider not found`);
        throw new HttpException('Provider not found', HttpStatus.NOT_FOUND);
      }

      let formatStart = parseISO(createAvailibilityDto.start);
      const startDate = format(formatStart, 'yyyy-MM-dd');
      const startTime = format(formatStart, 'HH:mm');

      const formatEnd = parseISO(createAvailibilityDto.end);
      const endDate = format(formatEnd, 'yyyy-MM-dd');
      const endTime = format(formatEnd, 'HH:mm');

      const todayDate = format(new Date(), 'yyyy-MM-dd');
      this.logger.debug(todayDate);

      const date = parseISO(`${startDate}T00:00:00.000Z`);

      const match = createAvailibilityDto.duration.match(
        /(\d*\.?\d*)\s*(hour|hr|min|minutes?)/i,
      );
      if (!match) return null;
      const duration =
        parseFloat(match[1]) * (match[2].toLowerCase().includes('h') ? 60 : 1);

      if (startDate != endDate) {
        this.logger.error(`Start and end date should me same`);
        throw new HttpException(
          'Start and end date should me same',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (startDate < todayDate) {
        this.logger.error(`Do not select past date`);
        throw new HttpException(
          'Do not select past date',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (startTime > endTime) {
        this.logger.error(`start time should not greater than end time`);
        throw new HttpException(
          'start time should not greater than end time',
          HttpStatus.BAD_REQUEST,
        );
      }

      const providerSlots = await this.prisma.avalibility.findFirst({
        where: {
          providerId: createAvailibilityDto.providerId,
          date,
        },
      });
      if (providerSlots) {
        this.logger.error(
          `Already set availibility time on this date ${createAvailibilityDto.start}`,
        );
        throw new HttpException(
          `Already set availibility time on this date ${createAvailibilityDto.start}`,
          HttpStatus.CONFLICT,
        );
      }

      createAvailibilityDto.start = startTime;
      createAvailibilityDto.end = endTime;
      createAvailibilityDto['date'] = date;

      console.log('createAvailibilityDto', createAvailibilityDto);

      const setAvailibility = await this.prisma.avalibility.create({
        data: createAvailibilityDto,
      });

      if (!setAvailibility.providerId) {
        throw new HttpException(
          'providerId should be available',
          HttpStatus.BAD_REQUEST,
        );
      }

      const slots: string[] = [];

      while (formatStart < formatEnd) {
        const slotStart = format(formatStart, 'HH:mm');
        const nextSlotTime = addMinutes(formatStart, duration);
        const slotEnd = format(nextSlotTime, 'HH:mm');

        if (nextSlotTime <= formatEnd) {
          slots.push(`${slotStart} - ${slotEnd}`);
        }

        formatStart = nextSlotTime;
      }
      this.logger.debug('slots are: ', slots);
      if (!setAvailibility.providerId) {
        throw new HttpException(
          'providerId should be available',
          HttpStatus.BAD_REQUEST,
        );
      }

      for (const slot of slots) {
        const [start, end] = slot.split(' - ');
        await this.prisma.slots.create({
          data: {
            start,
            end,
            avalibilityId: setAvailibility.id,
            providerId: setAvailibility.providerId,
            status: 'open',
          },
        });
      }

      this.logger.log(`Slot created successfully`);
      return {
        status: HttpStatus.OK,
        message: 'created successfully',
        result: setAvailibility,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }

  async getAvailibility(
    searchAvailibilityDto: SearchAvailibilityDto,
    request: any,
  ) {
    try {

      this.logger.debug(
        'Search Avalibility date is ',
        searchAvailibilityDto.date,
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.logger.debug('Today date is ', today);

      if (searchAvailibilityDto.date < today) {
        this.logger.error('Date must not be in the past');
        throw new HttpException(
          'Date must not be in the past',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (
        request.userRole.toLowerCase() === 'provider' &&
        request.userId != searchAvailibilityDto.providerId
      )

      {
        this.logger.error(`Forbidden resource"`);
        throw new HttpException(
          'You do not have permission to access this resource',
          HttpStatus.FORBIDDEN,
        );
      }

      const availableSlots = await this.prisma.avalibility.findMany({
        where: {
          providerId: searchAvailibilityDto.providerId,
          date: searchAvailibilityDto.date,
        },
        include: {
          slots: {
            where: {
              status: 'open',
            },
            select: {
              id: true,
              start: true,
              end: true,
              status: true,
            },
          },
        },
        omit: {
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!availableSlots.length) {
        throw new HttpException(
          'Provider is not Available',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        status: HttpStatus.OK,
        message: 'Data fatch successfully ',
        result: availableSlots,
      };
    } catch (error) {
      this.logger.error(`${error}`);
      throw error;
    }
  }
}
