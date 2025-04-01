import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { VendorsService } from "./vendors.service";
import {
  CreateVendorDto,
  UpdateVendorDto,
  QueryFindVendorsDto,
} from "./dto/vendors.dto";
import {
  ResponseCreateVendorDto,
  ResponseDeleteVendorDto,
  ResponseFindAllVendorDto,
  ResponseFindSingleVendorDto,
  ResponseUpdateVendorDto,
} from "./dto/response.dto";
import { VendorExistsGuard } from "src/guards/vendor-exists.guard";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller("vendors")
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "vendor created successfully",
    type: ResponseCreateVendorDto,
  })
  @ApiOperation({ summary: "Create Vendor" })
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorsService.create(createVendorDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "vendors found successfully",
    type: ResponseFindAllVendorDto,
  })
  @ApiOperation({ summary: "Get All the Vendors" })
  findAll(@Query() queryFindVendorsDto: QueryFindVendorsDto) {
    return this.vendorsService.findAll(queryFindVendorsDto);
  }

  @Get(":id")
  @UseGuards(VendorExistsGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "vendor found successfully",
    type: ResponseFindSingleVendorDto,
  })
  @ApiOperation({ summary: "Get Sigle Vendor by id" })
  async findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return await this.vendorsService.findOne(id);
  }

  @Put(":id")
  @UseGuards(VendorExistsGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "vendor updated successfully",
    type: ResponseUpdateVendorDto,
  })
  @ApiOperation({ summary: "Update Vendor" })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ) {
    return this.vendorsService.update(id, updateVendorDto);
  }

  @Delete(":id")
  @UseGuards(VendorExistsGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "vendor deleted successfully",
    type: ResponseDeleteVendorDto,
  })
  @ApiOperation({ summary: "Delete Vendor" })
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.vendorsService.remove(id);
  }
}
