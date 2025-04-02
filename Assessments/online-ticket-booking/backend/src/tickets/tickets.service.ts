import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class TicketsService {
    private readonly logger = new Logger();
    constructor(
        private readonly prismaClient : PrismaClient
    ){}

    async getTicketsByUserId(userId:number){
        try{
            const ticketFound = await this.prismaClient.tickets.findFirst({
                where : { 
                    userId
                }
            })

            if(!ticketFound){
                this.logger.warn(`No ticket found for provided user id.`);
                throw new HttpException('No ticket found.',HttpStatus.NOT_FOUND);
            }

            this.logger.log(`Ticket for given user id fetched succesfully.`);
            return{
                message:'Ticket Detail Fetched Succesfully',
                statusCode:HttpStatus.OK,
                data : ticketFound
            }
        }catch(error){
            this.logger.error('Error in fetch event by id');
            throw error;
        }
    }
}
