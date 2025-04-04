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
            const whereCondition: any = {};

            if(userId){
                whereCondition.userId = userId;
            }

            const ticketFound = await this.prismaClient.tickets.findMany({
                where : whereCondition,
                include:{
                    event:{
                        select:{
                            eventName:true,
                        },
                    },
                    show:{
                        select:{
                            showDate: true
                        }
                    }
                }
            })

//             if(!ticketFound){
//                 this.logger.warn(`No ticket found for provided user id.`);
//                 throw new HttpException('No ticket found.',HttpStatus.NOT_FOUND);
//             }

//              // Initialize ticket count for each month
//         const monthMap = [
//             "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//         ];
//         const monthlyTicketCount: { [key: string]: number } = {};
//         monthMap.forEach(month => {
//             monthlyTicketCount[month] = 0;
//         });

//         // Tally up the ticket counts per month
//         for (const ticket of ticketFound) {
//     const createdAt = ticket.createdeAt;
//     if (createdAt instanceof Date) {
//         const monthName = monthMap[createdAt.getMonth()];
//         monthlyTicketCount[monthName] += ticket.bookedTicketsCount || 0;
//     }
// }


//         // Convert to array format
//         const monthlyTicketData = monthMap.map(month => ({
//             month,
//             tickets: monthlyTicketCount[month]
//         }));


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
