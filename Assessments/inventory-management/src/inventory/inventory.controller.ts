import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { InventoryService } from "./inventory.service";
import {
  QueryFindInventorysDto,
  UpdateInventoryDto,
} from "./dto/inventory.dto";
import {
  ResponseFindAllInventoryDto,
  ResponseFindSingleInventoryDto,
  ResponseUpdateInventoryDto,
} from "./dto/response.dto";

@ApiBearerAuth()
@Controller("inventory")
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Inventories found successfully",
    type: ResponseFindAllInventoryDto,
  })
  @ApiOperation({ summary: "Get All the Inventory" })
  findAll(@Query() queryFindInventorysDto: QueryFindInventorysDto) {
    return this.inventoryService.findAll(queryFindInventorysDto);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "inventory found successfully",
    type: ResponseFindSingleInventoryDto,
  })
  @ApiOperation({ summary: "Get Sigle inventory by id" })
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    return await this.inventoryService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "inventory updated successfully",
    type: ResponseUpdateInventoryDto,
  })
  @ApiOperation({ summary: "Update inventory" })
  update(
    @Param("id") id: string,
    @Body() updateinventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(id, updateinventoryDto);
  }
}
