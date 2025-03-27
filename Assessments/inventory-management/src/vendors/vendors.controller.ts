import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { VendorsService } from './vendors.service';
import {
  CreateVendorDto,
  UpdateVendorDto,
  QueryFindVendorsDto,
} from './dto/vendors.dto';
import {
  ResponseCreateVendorDto,
  ResponseDeleteVendorDto,
  ResponseFindVendorDto,
  ResponseUpdateVendorDto,
} from './dto/response.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'user created successfully',
    type: ResponseCreateVendorDto,
  })
  @ApiOperation({ summary: 'Create Vendor' })
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'users found successfully',
    type: [ResponseFindVendorDto],
  })
  @ApiOperation({ summary: 'Get All the Vendors' })
  findAll(@Query() queryFindVendorsDto: QueryFindVendorsDto) {
    return this.vendorsService.findAll(queryFindVendorsDto);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user found successfully',
    type: ResponseFindVendorDto,
  })
  @ApiOperation({ summary: 'Get Sigle Vendor by id' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.vendorsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user updated successfully',
    type: ResponseUpdateVendorDto,
  })
  @ApiOperation({ summary: 'Update Vendor' })
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorsService.update(id, updateVendorDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user deleted successfully',
    type: ResponseDeleteVendorDto,
  })
  @ApiOperation({ summary: 'Delete Vendor' })
  remove(@Param('id') id: string) {
    return this.vendorsService.remove(id);
  }
}
