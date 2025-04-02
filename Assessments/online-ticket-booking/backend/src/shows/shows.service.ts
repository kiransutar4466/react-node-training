import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ShowTicketInputDto } from './dto/show_ticket.dto';
import { contains } from 'class-validator';
import { GetShowQueryInputDto } from './dto/show.dto';

@Injectable()
export class ShowsService {
  private readonly logger = new Logger();
  constructor(
    private readonly prismaClient : PrismaClient
  ){}

  async getAllShows(getShowQueryInputDto:GetShowQueryInputDto) {
    try{
      const { eventId, eventName,eventShowDate} = getShowQueryInputDto;

      const whereCondition : any = {};

      if(eventId){
        whereCondition.eventId = eventId
      }

      if(eventShowDate){
        whereCondition.showDate = new Date(eventShowDate)
      }

      if(eventName){
        whereCondition.event ={
          OR:[
            {
              eventName:{
                contains: eventName,
                mode:'insensitive',
              },
              
            }
          ]
        } 
      }

      const allShows = await this.prismaClient.shows.findMany({
        where : whereCondition,
      });

      this.logger.log("All shows data fetched succesfully");
      return {
        message: 'All shows data fetched succesfully',
        statusCode: HttpStatus.OK,
        data: allShows
      };
    }catch(error){
      // this.logger.error("error in fetch shows data");
      this.logger.error("error:",error);

      throw new HttpException('error in fetch shows data',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getShowById(id: number) {
    try{
          const showFound = await this.prismaClient.shows.findFirst({
          where : { id }
      })

      if(!showFound){
          this.logger.warn(`No show found with id ${id}`);
          throw new HttpException('No show found for provided id.',HttpStatus.NOT_FOUND);
      }

      this.logger.log(`Event fetched succesfully with id ${id}`);
      return {
        message: 'All shows data fetched succesfully',
        statusCode: HttpStatus.OK,
        data: showFound
      };
  }catch(error){
      this.logger.error('Error in fetch show by id');
      throw error;
  }
  }

  // async showsDetailByDate(eventId:number,eventShowDate:string){
  //   try{
  //       const parsedDate = new Date(eventShowDate);
  //       const eventShowsData = await this.prismaClient.shows.findMany({
  //         where :{
  //           eventId:eventId,
  //           showDate:parsedDate
  //         }
  //       });

  //       this.logger.log("All shows data fetched according to date and event id");
  //       return{
  //         message: 'All shows data fetched according to date and event id',
  //         statusCode: HttpStatus.OK,
  //         data: eventShowsData
  //       }
  //   }catch(error){
  //     this.logger.error('Error in fetch show detail by date and event id');
  //     throw error;
  //   }
  // }

  async bookShowTicket(showTicketInputDto:ShowTicketInputDto){
    try{
        const findShow = await this.prismaClient.shows.findUnique({
          where : {
            id:showTicketInputDto.showId
          },
          select : {
            showSelectedTickets : true,
            showTotalTickets : true,
            showAvailableTickets : true
          }
        });

        if(!findShow){
          this.logger.error("No show found with provided id");
          throw new HttpException('No show found',HttpStatus.NOT_FOUND);
        }

        const {userId,eventId,showId,selectedTickets,amoutPaid} = showTicketInputDto;
        const {showSelectedTickets} = findShow;
        
        const selectedTicketArray : number[] = showSelectedTickets as number[];
        const updatedSelectedTickets = [...selectedTickets,...selectedTicketArray];
        const totalSelectedTicketsCount = updatedSelectedTickets.length;
        const showTotalTickets = findShow.showTotalTickets ?? 0;
        const showAvailableTickets = showTotalTickets - totalSelectedTicketsCount;

        if (showAvailableTickets <= 0 || showAvailableTickets<selectedTickets.length){
          this.logger.error(`Not enough tickets available, Available Tickets = ${showAvailableTickets}`);
          throw new HttpException(`Not enough tickets available, Available Tickets = ${showAvailableTickets}`,HttpStatus.BAD_REQUEST);
        }

        const alreadyBooked = selectedTickets.some(tickets=>selectedTicketArray.includes(tickets));

        if(alreadyBooked){
          this.logger.error("You are trying to book seat which is already booked by someone.");
          throw new HttpException("You are trying to book seat which is already booked by someone.",HttpStatus.CONFLICT);
        }

        await this.prismaClient.shows.update({
          where: { id: showTicketInputDto.showId },
          data: {
              showSelectedTickets: updatedSelectedTickets,
              showAvailableTickets: showAvailableTickets
          }
      });

      await this.prismaClient.tickets.create({
        data: {
            userId,
            eventId,
            showId,
            ticketNumbers: selectedTickets,
            bookedTicketsCount: selectedTickets.length,
            amoutPaid
        }
    });

    this.logger.log("Ticket booked succesfully");
    return {
      message : "Ticket booked succesfully",
      statusCode : HttpStatus.CREATED,
    }
    }catch(error){
      this.logger.error("Error in ticket creating");
      throw error;
    }
  }
}
