import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { AvailibilityService } from './availibility.service';
import { CreateAvailibilityDto } from './dto/createAvailibility.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchAvailibilityDto } from './dto/searchQuery.dto';

@Controller('api/availibility')
export class AvailibilityController {
  constructor(private readonly availibilityService: AvailibilityService) {}

   @ApiBearerAuth()
  @Post()
   @ApiOperation({ summary: 'Add availibility of provider' })
   @ApiResponse({ status: 201, description: 'Add Availibility successfully' })
  async create(@Body() createAvailibilityDto: CreateAvailibilityDto,@Req() request: any) {
    return await this.availibilityService.create(createAvailibilityDto,request.user);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Available slots are'})
  @ApiResponse({
    status: 200,
  })
  async getAvailibility(@Query() searchAvailibilityDto:SearchAvailibilityDto,@Req() request: any) {
    return await this.availibilityService.getAvailibility(searchAvailibilityDto,request.user);
  }
}
