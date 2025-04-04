import { Controller, Get, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @ApiOperation({summary:'get tickets detail by user id'})
  @ApiQuery({name:'userId',required:false})
  @Get()
  async getTicketsByUserId(@Query('userId') userId:number){
    return this.ticketsService.getTicketsByUserId(userId);
  }
}
