import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ShowTicketInputDto } from './dto/show_ticket.dto';
import { GetShowQueryInputDto } from './dto/show.dto';

@ApiBearerAuth()
@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @ApiOperation({summary:'fetch all shows'})
  @Get()
  async getAllShows(@Query() getShowQueryInputDto:GetShowQueryInputDto) {
    return this.showsService.getAllShows(getShowQueryInputDto);
  }

  // @Get('/showsDetailByDate')
  // async showsDetailByDate(
  //   @Query('eventId') eventId:number,
  //   @Query('eventShowDate') eventShowDate:string
  // ){
  //   return this.showsService.showsDetailByDate(eventId,eventShowDate);
  // }

  @ApiOperation({summary:'get show by id'})
  @Get(':id')
  async getShowById(@Param('id') id: number) {
    return this.showsService.getShowById(id);
  }
  
  @ApiOperation({summary:'book shows ticket'})
  @Post()
  async bookShowTicket(@Body() showTicketInputDto:ShowTicketInputDto){
    return this.showsService.bookShowTicket(showTicketInputDto);
  }
}
