/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
  ResponseCancelOrderItemDto,
  ResponseCreateOrdersDto,
  ResponseFindAllOrdersDto,
  ResponseFindSingleOrderItemDto,
} from "./dto/response.dto";
import { QueryFindOrdersDto } from "./dto/orders.dto";
import { Request } from "express";

@ApiBearerAuth()
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "orders placed successfully",
    type: ResponseCreateOrdersDto,
  })
  @ApiOperation({ summary: "Create or Place an Orders" })
  create(@Req() req: Request) {
    return this.ordersService.create(req["decoded"].id);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "orders found successfully",
    type: ResponseFindAllOrdersDto,
  })
  @ApiOperation({ summary: "Get All the Orders for Buyer Vendor" })
  findAll(
    @Query() queryFindOrdersDto: QueryFindOrdersDto,
    @Req() req: Request,
  ) {
    return this.ordersService.findAll(queryFindOrdersDto, req["decoded"].id);
  }

  @Get(":orderItemId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "order item found successfully",
    type: ResponseFindSingleOrderItemDto,
  })
  @ApiOperation({
    summary: "Get Single Order Item for Buyer/Seller Vendor or for Admin",
  })
  findSingleOrderItem(
    @Param("orderItemId", new ParseUUIDPipe()) orderItemId: string,
    @Req() req: Request,
  ) {
    return this.ordersService.findSingleOrderItem(
      orderItemId,
      req["decoded"].id,
      req["decoded"].inventoryId,
      req["decoded"].role,
    );
  }

  @Patch(":orderItemId")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "order item cancelled successfully",
    type: ResponseCancelOrderItemDto,
  })
  @ApiOperation({ summary: "Cancel Single Order Item for Buyer Vendor" })
  cancelOrderItem(
    @Param("orderItemId", new ParseUUIDPipe()) orderItemId: string,
    @Req() req: Request,
  ) {
    return this.ordersService.cancelOrderItem(orderItemId, req["decoded"].id);
  }
}
