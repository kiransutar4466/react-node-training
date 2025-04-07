/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { CartItemsService } from "./cartItems.service";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
  CreateCartItemDto,
  QueryFindCartItemDto,
  UpdateCartItemDto,
} from "./dto/cartItems.dto";
import {
  ResponseCreateCartItemDto,
  ResponseDeleteAllCartItemDto,
  ResponseDeleteCartItemDto,
  ResponseFindAllCartItemDto,
  ResponseFindSingleCartItemDto,
  ResponseUpdateCartItemDto,
} from "./dto/response.dto";
import { Request } from "express";

@ApiBearerAuth()
@Controller("cartItems")
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Cart created successfully",
    type: ResponseCreateCartItemDto,
  })
  @ApiOperation({ summary: "Create Cart" })
  create(@Body() createCartItemDto: CreateCartItemDto, @Req() req: Request) {
    return this.cartItemsService.create(createCartItemDto, req["decoded"].id);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "cart items found successfully",
    type: ResponseFindAllCartItemDto,
  })
  @ApiOperation({ summary: "Get All the Cart Items" })
  findAll(
    @Query() queryFindCategoriesDto: QueryFindCartItemDto,
    @Req() req: Request,
  ) {
    return this.cartItemsService.findAll(
      queryFindCategoriesDto,
      req["decoded"].id,
    );
  }

  @Delete()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "all cart items deleted successfully",
    type: ResponseDeleteAllCartItemDto,
  })
  @ApiOperation({ summary: "Delete All Cart Items" })
  removeAll(@Req() req: Request) {
    return this.cartItemsService.removeAll(req["decoded"].id);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product found successfully",
    type: ResponseFindSingleCartItemDto,
  })
  @ApiOperation({ summary: "Get Single Cart Item by Id" })
  findOne(@Param("id", new ParseUUIDPipe()) id: string, @Req() req: Request) {
    return this.cartItemsService.findOne(id, req["decoded"].id);
  }

  @Patch(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "cart item updated successfully",
    type: ResponseUpdateCartItemDto,
  })
  @ApiOperation({ summary: "Update Cart Item" })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req: Request,
  ) {
    return this.cartItemsService.update(
      id,
      updateCartItemDto,
      req["decoded"].id,
    );
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "cart item deleted successfully",
    type: ResponseDeleteCartItemDto,
  })
  @ApiOperation({ summary: "Delete Cart Item" })
  remove(@Param("id", new ParseUUIDPipe()) id: string, @Req() req: Request) {
    return this.cartItemsService.remove(id, req["decoded"].id);
  }
}
