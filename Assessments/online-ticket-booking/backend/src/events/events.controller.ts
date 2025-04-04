import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EventInputDto, UpdateEventDto } from './dto/event.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { QueryInputDto } from './dto/query.param.dto';


@ApiBearerAuth()
@Controller('api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  //CREATE EVENT 
    @UseGuards(AuthGuard)
    @Roles('admin')
    @ApiOperation({summary:'create an event'})
    @ApiQuery({name:"force",required:false,description:"make it true if you want to overlap show"})
    @Post()
    async createEvent(@Body() eventInputDto:EventInputDto,@Query('force') force:boolean) {
      return this.eventsService.createEvent(eventInputDto,force);
    }

  //FETCH ALL EVENT DATA
    @ApiOperation({summary:'fetch all events'})
    @ApiQuery({name:'eventName',required:false,description:'Filter event by name'})
    @ApiQuery({name:'eventCategory',required:false,description:'Filter event by category'})
    @ApiQuery({name:'eventStartDate',required:false,description:'Filter event by start date'})
    @ApiQuery({name:'eventEndDate',required:false,description:'Filter event by end date'})
    @ApiQuery({name:'eventEndDate',required:false,description:'Filter event by end date'})
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination' })
   @ApiQuery({ name: 'limit', required: false, description: 'Number of events per page' })
    @Get()
    async getEvents(@Query() queryInputDto:QueryInputDto){
      return this.eventsService.getEvents(queryInputDto);
    }

  //GET EVENT BY ID 
    @ApiOperation({summary:'fetch event by id'})
    @Get(':id')
    async getEventById(@Param('id') id:number){
       return this.eventsService.getEventById(id);
    }
  
  // UPDATE AN EVENT 
    @UseGuards(AuthGuard)
    @Roles('admin')
    @ApiOperation({summary:'update an event'})
    @Patch(':id')
    async updateEvent(@Param('id') id:number,@Body() updateEventDto:UpdateEventDto){
       return this.eventsService.updateEvent(id,updateEventDto);
    }

  // DELETE AN EVENT
    @UseGuards(AuthGuard)
    @Roles('admin')
    @ApiOperation({summary:'delete an event'})
    @Delete(':id')
    async deleteEvent(@Param('id') id:number){
      return this.eventsService.deleteEvent(id); 
    }

}
