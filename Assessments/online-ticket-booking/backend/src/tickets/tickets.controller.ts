import { Controller, Get, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiQuery({name:'userId'})
  async getTicketsByUserId(@Query('userId') userId:number){
    return this.ticketsService.getTicketsByUserId(userId);
  }
}
