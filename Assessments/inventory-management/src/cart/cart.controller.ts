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
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateCartItemDto, QueryFindCartItemDto } from "./dto/cart.dto";
import {
  ResponseCreateCartItemDto,
  ResponseDeleteCartItemDto,
  ResponseFindAllCartItemDto,
  ResponseFindSingleCartItemDto,
} from "./dto/response.dto";

@ApiBearerAuth()
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Cart created successfully",
    type: ResponseCreateCartItemDto,
  })
  @ApiOperation({ summary: "Create Cart" })
  create(@Body() createCartItemDto: CreateCartItemDto, @Req() req: Request) {
    return this.cartService.create(createCartItemDto, req["decoded"].id);
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
    return this.cartService.findAll(queryFindCategoriesDto, req["decoded"].id);
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product found successfully",
    type: ResponseFindSingleCartItemDto,
  })
  @ApiOperation({ summary: "Get Single Cart Item by Id" })
  findOne(@Param("id", new ParseUUIDPipe()) id: string, @Req() req: Request) {
    return this.cartService.findOne(id, req["decoded"].id);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "cart item deleted successfully",
    type: ResponseDeleteCartItemDto,
  })
  @ApiOperation({ summary: "Delete Cart Item" })
  remove(@Param("id", new ParseUUIDPipe()) id: string, @Req() req: Request) {
    return this.cartService.remove(id, req["decoded"].id);
  }
}
