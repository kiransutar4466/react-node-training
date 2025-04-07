import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { QueryInputDto } from 'src/events/dto/query.param.dto';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class DashboardService {
    private readonly logger = new Logger();

    constructor(
        private readonly prismaClient : PrismaClient,
        private readonly eventService : EventsService
    ){}

    async getDashboardData(){
        try{
            const totalEvents = await this.prismaClient.events.count({
                where:{
                    isDeleted:false
                }
            });

            const ticketInfo = await this.prismaClient.tickets.aggregate({
                _sum:{
                    bookedTicketsCount : true,
                    amoutPaid : true
                }
            })

            const totalTicketBooked = ticketInfo._sum.bookedTicketsCount;
            const totalRevenue = ticketInfo._sum.amoutPaid;

            // Create DTO for filtering upcoming events
            const upcomingDto: QueryInputDto = {
                eventStatus: 'upcoming',
                page : 1,
                limit : 10
            };
            
            const upcomingEventsData = await this.eventService.getEvents(upcomingDto);

            const allTickets = await this.prismaClient.tickets.findMany({
                select: {
                  createdeAt: true,
                  bookedTicketsCount: true,
                  show:{
                    select:{
                        showDate: true
                    }
                  }
                },
              });
              const monthlyCounts = {};


              allTickets.forEach(ticket=>{
                if(!ticket.createdeAt) return;

                const date = new Date(ticket.createdeAt);
                const month = date.toLocaleString('default', { month: 'short' });
                if(!monthlyCounts[month]){
                    monthlyCounts[month] = 0;
                }
                monthlyCounts[month] += ticket.bookedTicketsCount; 
              })

              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

              const ticketsPerMonth = months.map(month=>({
                month,
                tickets : monthlyCounts[month] || 0
              }))
              

            return{
                message: 'Dashboard stats fetched successfully',
                statusCode: HttpStatus.OK,
                data: {
                  totalEvents,
                  totalTicketBooked,
                  totalRevenue,
                  ticketsPerMonth,
                  upcomingEventsData
                },
            };
        }catch(error){
            this.logger.error("Error in dashoboard service");
            throw error;
        }
    }
}
