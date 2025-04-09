import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { SearchQueryAppointmentDto } from './dto/searchQueryAppointment.dto';

@Controller('api/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Appointment' })
  create(@Body() createAppointmentDto: CreateAppointmentDto,@Req() request:any) {
    return this.appointmentService.create(createAppointmentDto,request.user);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Search Appointment by Id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '760af731-5b98-4b95-a89b-e7f65c67e172',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string,@Req() request:any) {
    return this.appointmentService.findOne(id,request.user);
  }

  @ApiBearerAuth()
  @Get() 
  @ApiOperation({ summary: 'Get all Appointment' })
  @ApiResponse({
    status: 200,
    description: 'User fetch successfully',
  })
  async getAllAppointment(
    @Query() searchQueryAppointmentDto: SearchQueryAppointmentDto,@Req() request:any) {
    return await this.appointmentService.getAllAppointment(
      searchQueryAppointmentDto,request.user);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'update Appointment' })
  @ApiResponse({
    status: 200,
    description: 'Appointment updated successfully',
  })
  @ApiBearerAuth()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,@Req() request:any,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto,request.user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string,@Req() request:any) {
    return this.appointmentService.remove(id,request.user);
  }
}
