import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { EventInputDto, UpdateEventDto } from './dto/event.dto';
import { PrismaClient } from '@prisma/client';
import { ShowInputDto } from './dto/show.dto';
import { contains } from 'class-validator';
import { QueryInputDto } from './dto/query.param.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger();
  constructor(private readonly prismaClient: PrismaClient) {}

  getShowDataForInsert(
    startDate: Date,
    endDate: Date,
    eventSlots: { day: string; startTime: string; endTime: string }[],
    eventTotalSeats: number,
    eventId: number,
  ) {
    const showData: ShowInputDto[] = [];
    let tempDate = startDate;

    while (tempDate <= endDate) {
      let day = tempDate
        .toLocaleString('en-us', { weekday: 'long' })
        .toLowerCase();

      const slotsForDay = eventSlots.filter(
        (slots) => slots.day.toLowerCase() === day,
      );

      if (slotsForDay.length > 0) {
        const dateForDay = new Date(tempDate);
        dateForDay.setHours(12, 0, 0, 0); // Ensures the date remains in local time

        // console.log("Before Insert:", tempDate.toISOString(), "Processed Date:", dateForDay.toISOString());

        slotsForDay.forEach((slots) => {
          showData.push({
            eventId: eventId,
            showStartTime: slots.startTime,
            showEndTime: slots.endTime,
            showDate: dateForDay,
            showTotalTickets: eventTotalSeats,
            showSelectedTickets: [],
            showAvailableTickets: eventTotalSeats,
          });
        });
      }
      tempDate.setDate(tempDate.getDate() + 1);
      tempDate.setHours(12, 0, 0, 0);
    }
    return showData;
  }

  async createEvent(eventInputDto: EventInputDto) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      //check if end date is less than start date and start date is less than today (event should be creted for future or present date not for past)
      if (
        eventInputDto.eventStartDate < today ||
        eventInputDto.eventEndDate < eventInputDto.eventStartDate
      ) {
        this.logger.error(
          'Invalid event dates: Start date should be before end date and both should be in the future.',
        );
        throw new HttpException(
          'Invalid event dates: Start date should be before end date and both should be in the future.',
          HttpStatus.BAD_REQUEST,
        );
      }

      //check - event already exist with same name and time date range
      const eventAlreadyExist = await this.prismaClient.events.findFirst({
        where: {
          eventName: eventInputDto.eventName,
          eventStartDate: eventInputDto.eventStartDate,
          eventEndDate: eventInputDto.eventEndDate,
          isDeleted: false,
        },
      });

      if (eventAlreadyExist) {
        this.logger.error(
          'An event with the same name and date range already exists',
        );
        throw new HttpException(
          'An event with the same name and date range already exists',
          HttpStatus.CONFLICT,
        );
      }

      //event price and number seats should be positive
      if (eventInputDto.eventPrice < 0 || eventInputDto.eventTotalSeats < 0) {
        this.logger.error(
          'Event price and total seats should be positive values.',
        );
        throw new HttpException(
          'Event price and total seats should be positive values.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const event = await this.prismaClient.events.create({
        data: eventInputDto,
      });
      this.logger.log('Event created succesfully');

      const { eventTotalSeats, eventStartDate, eventEndDate, eventSlots } =
        eventInputDto;
      const { days, slots } = eventInputDto.eventSlots;

      const showData = this.getShowDataForInsert(
        eventStartDate,
        eventEndDate,
        eventSlots,
        eventTotalSeats,
        event.id,
      );

      
      //check for shows overlapping
      for (const slots of showData) {
        // console.log("Slots Date : ",slots.showDate);
        const overlappingShow = await this.prismaClient.shows.findFirst({
          where: {
            showDate: slots.showDate,
            showStartTime: slots.showStartTime,
            showEndTime: slots.showEndTime,
          },
        });

        if (overlappingShow) {
          this.logger.error(
            'Some shows are overlapping. Do you want to continue?',
          );
          throw new HttpException(
            'Some shows are overlapping. Do you want to continue?',
            HttpStatus.CONFLICT,
          );
        }
      }

      await this.prismaClient.shows.createMany({
        data: showData,
      });
      this.logger.log('Data insreted in show table');

      return {
        message: 'Event Created Succesfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      this.logger.error('Error in creating event');
      throw error;
    }
  }

  async getEvents(queryInputDto: QueryInputDto) {
    try {
      const whereCondition: any = {
        isDeleted: false,
      };

      if (queryInputDto.eventName) {
        whereCondition.eventName = {
          contains: queryInputDto.eventName,
          mode: 'insensitive',
        };
      }

      if (
        queryInputDto.eventCategory &&
        queryInputDto.eventCategory !== 'All'
      ) {
        whereCondition.eventCategory = {
          contains: queryInputDto.eventCategory,
          mode: 'insensitive',
        };
      }

      if (queryInputDto.eventStartDate) {
        // whereCondition.eventStartDate = {
        //     gte: new Date(queryInputDto.eventStartDate)
        // }; // this will give event whose starting date greater than or equal to search date
        const startDate = new Date(queryInputDto.eventStartDate);
        if (!isNaN(startDate.getTime())) {
          whereCondition.eventStartDate = startDate;
        }
      }

      if (queryInputDto.eventEndDate) {
        const endDate = new Date(queryInputDto.eventEndDate);
        if (!isNaN(endDate.getTime())) {
          whereCondition.eventEndDate = endDate;
        }
      }

      let allEvents;
      let totalCounts;
      let pagination = {};

      const { page, limit } = queryInputDto;

      const skip = (page - 1) * limit;

      allEvents = await this.prismaClient.events.findMany({
        where: whereCondition,
        skip,
        take: limit,
      });

      totalCounts = await this.prismaClient.events.count({
        where: whereCondition,
      });
      const totalPages = Math.ceil(totalCounts / limit);

      const prev = page > 1 ? page - 1 : null;
      const next = page < totalPages ? page + 1 : null;
      pagination = {
        page,
        limit,
        prev,
        next,
        totalPages,
      };

      this.logger.log('All events data fetched succesfully');
      // return allEvents;
      return {
        message: 'Events fetched Succesfully',
        statusCode: HttpStatus.OK,
        data: allEvents,
        ...(pagination ? { pagination } : {}),
      };
    } catch (error) {
      this.logger.error('Error in fetch event data');
      throw new HttpException(
        'Error in get events',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEventById(id: number) {
    try {
      const eventFound = await this.prismaClient.events.findFirst({
        where: {
          id,
          isDeleted: false,
        },
        // include : {
        //     shows : true,
        // }
      });

      if (!eventFound) {
        this.logger.warn(`No event found.`);
        throw new HttpException('No event found.', HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Event fetched succesfully with id ${id}`);
      return {
        message: 'Event Created Succesfully',
        statusCode: HttpStatus.OK,
        data: eventFound,
      };
    } catch (error) {
      this.logger.error('Error in fetch event by id');
      throw error;
    }
  }

  async updateEvent(id: number, updateEventDto: UpdateEventDto) {
    try {
      const eventFound = await this.prismaClient.events.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!eventFound) {
        this.logger.warn(`No event found with id ${id}`);
        throw new HttpException(
          `No event found with provided id`,
          HttpStatus.NOT_FOUND,
        );
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const {
        eventName,
        eventPrice,
        eventTotalSeats,
        eventSlots,
        eventStartDate,
        eventEndDate,
      } = updateEventDto;

      //check if end date is less than start date and start date is less than today (event should be creted for future or present date not for past)
      if (
        (eventStartDate && eventStartDate < today) ||
        (eventStartDate && eventEndDate && eventEndDate < eventStartDate)
      ) {
        this.logger.error(
          'Invalid event dates: Start date should be before end date and both should be in the future.',
        );
        throw new HttpException(
          'Invalid event dates: Start date should be before end date and both should be in the future.',
          HttpStatus.BAD_REQUEST,
        );
      }

      console.log('eventName : ', eventName);
      console.log('eventStartDate : ', eventStartDate);
      console.log('eventEndDate : ', eventEndDate);

      if (eventName || eventStartDate || eventEndDate) {
        //check - event already exist with same name and time date range
        const eventAlreadyExist = await this.prismaClient.events.findFirst({
          where: {
            eventName: eventName,
            eventStartDate: eventStartDate,
            eventEndDate: eventEndDate,
            isDeleted: false,
            id: {
              not: id,
            },
          },
        });
        console.log('Exist event : ', eventAlreadyExist);
        console.log('Exist event id: ', eventAlreadyExist?.id);

        if (eventAlreadyExist) {
          this.logger.error(
            'An event with the same name and date range already exists',
          );
          throw new HttpException(
            'An event with the same name and date range already exists',
            HttpStatus.CONFLICT,
          );
        }
      }

      const findEventSlots = eventFound.eventSlots;

      if (
        (eventSlots &&
          JSON.stringify(findEventSlots) !== JSON.stringify(eventSlots)) ||
        (eventStartDate &&
          eventFound.eventStartDate?.getTime() !== eventStartDate?.getTime()) ||
        (eventEndDate &&
          eventFound.eventEndDate?.getTime() !== eventEndDate?.getTime())
      ) {
        // console.log("Event slots or event dates have been updated");
        await this.prismaClient.shows.deleteMany({
          where: {
            eventId: id,
          },
        });

        const { eventTotalSeats, eventStartDate, eventEndDate, eventSlots } =
          updateEventDto;

        const showData = this.getShowDataForInsert(
          eventStartDate ?? eventFound.eventStartDate ?? new Date(),
          eventEndDate ?? eventFound.eventEndDate ?? new Date(),
          eventSlots,
          eventTotalSeats ?? eventFound.eventTotalSeats ?? 0,
          id,
        );

        await this.prismaClient.shows.createMany({
          data: showData,
        });
        this.logger.log('Data insreted in show table');
      }

      // **Handle eventTotalSeats update in show table separately**
      if (eventTotalSeats !== eventFound.eventTotalSeats) {
        await this.prismaClient.shows.updateMany({
          where: { eventId: id },
          data: {
            showTotalTickets: eventTotalSeats,
            showAvailableTickets: eventTotalSeats,
          },
        });
        this.logger.log('Show ticket counts updated');
      }

      const updateEvent = await this.prismaClient.events.update({
        where: { id },
        data: updateEventDto,
      });

      this.logger.log('Event and Shows updated succesfully');
      return {
        message: 'event and shows updated succesfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error('Error in updating event');
      // throw new HttpException('Error in get event',HttpStatus.INTERNAL_SERVER_ERROR);
      throw error;
    }
  }

  async deleteEvent(id: number) {
    try {
      const eventFound = await this.prismaClient.events.findUnique({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!eventFound) {
        this.logger.warn(`No event found with id ${id}`);
        throw new HttpException(`No event found`, HttpStatus.NOT_FOUND);
      }

      await this.prismaClient.shows.deleteMany({
        where: {
          eventId: id,
        },
      });

      // await this.prismaClient.events.delete({
      //     where : {id}
      // });

      await this.prismaClient.events.update({
        where: { id },
        data: { isDeleted: true },
      });

      this.logger.log('Event deleted succesfully');
      return {
        message: 'event deleted succesfully',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.error('Error in deleting event');
      // throw new HttpException('Error in event delete',HttpStatus.INTERNAL_SERVER_ERROR);
      throw error;
    }
  }
}
