/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { InventoryService } from "./inventory.service";
import {
  QueryFindInventorysDto,
  UpdateInventoryDto,
} from "./dto/inventory.dto";
import {
  ResponseFindAllInventoryDto,
  ResponseFindSingleInventoryAllOrderDto,
  ResponseFindSingleInventoryDto,
  ResponseFindSingleInventorySingleOrderDto,
  ResponseUpdateInventoryDto,
} from "./dto/response.dto";
import { Request } from "express";
import {
  QueryFindOrdersDto,
  UpdateOrderItemDto,
} from "src/orders/dto/orders.dto";
import {
  ResponseDeleteOrderItemDto,
  ResponseUpdateOrderItemDto,
} from "src/orders/dto/response.dto";

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

  @Get("orders")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "orders found successfully",
    type: ResponseFindSingleInventoryAllOrderDto,
  })
  @ApiOperation({ summary: "Get All the Orders for Seller Vendor's Inventory" })
  async findAllOrders(
    @Query() queryFindOrdersDto: QueryFindOrdersDto,
    @Req() req: Request,
  ) {
    return await this.inventoryService.findAllOrders(
      queryFindOrdersDto,
      req["decoded"].id,
      req["decoded"].inventoryId,
      req["decoded"].role,
    );
  }

  @Get("orders/:orderItemId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "order found successfully",
    type: ResponseFindSingleInventorySingleOrderDto,
  })
  @ApiOperation({ summary: "Get Single Order for Seller Vendor's Inventory" })
  async findSingleOrder(
    @Param("orderItemId", new ParseUUIDPipe()) orderItemId: string,
    @Req() req: Request,
  ) {
    return await this.inventoryService.findSingleOrder(
      orderItemId,
      req["decoded"].id,
      req["decoded"].inventoryId,
    );
  }

  @Patch("orders/:orderItemId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "order item updated successfully",
    type: ResponseUpdateOrderItemDto,
  })
  @ApiOperation({
    summary: "Update Single Order Item for Seller Vendor's Inventory",
  })
  async updateSingleOrderItem(
    @Param("orderItemId", new ParseUUIDPipe()) orderItemId: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
    @Req() req: Request,
  ) {
    return await this.inventoryService.updateSingleOrderItem(
      orderItemId,
      updateOrderItemDto,
      req["decoded"].id,
      req["decoded"].inventoryId,
    );
  }

  @Delete("orders/:orderItemId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "order item deleted successfully",
    type: ResponseDeleteOrderItemDto,
  })
  @ApiOperation({
    summary: "Delete Single Order Item for Seller Vendor's Inventory",
  })
  cancelOrderItem(
    @Param("orderItemId", new ParseUUIDPipe()) orderItemId: string,
    @Req() req: Request,
  ) {
    return this.inventoryService.deleteOrderItem(
      orderItemId,
      req["decoded"].id,
      req["decoded"].inventoryId,
    );
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "inventory found successfully",
    type: ResponseFindSingleInventoryDto,
  })
  @ApiOperation({ summary: "Get Sigle inventory by id" })
  async findOne(@Param("id", new ParseUUIDPipe(), ParseUUIDPipe) id: string) {
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
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateinventoryDto: UpdateInventoryDto,
    @Req() req: Request,
  ) {
    return this.inventoryService.update(
      id,
      updateinventoryDto,
      req["decoded"].id,
    );
  }
}
