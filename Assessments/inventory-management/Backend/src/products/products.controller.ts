/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Query,
  Req,
  ParseUUIDPipe,
  Patch,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { ProductsService } from "./products.service";
import {
  CreateProductDto,
  QueryFindProductDto,
  UpdateProductDto,
} from "./dto/products.dto";
import {
  ResponseCreateProductDto,
  ResponseDeleteProductDto,
  ResponseFindAllProductDto,
  ResponseFindCategoriesSoldCount,
  ResponseFindProductDto,
  ResponseFindProductsStats,
  ResponseFindSalesPerMonthForCurrentYear,
  ResponseUpdateProductDto,
} from "./dto/response.dto";
import { Request } from "express";

@ApiBearerAuth()
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "product created successfully",
    type: ResponseCreateProductDto,
  })
  @ApiOperation({ summary: "Create Product" })
  create(@Body() createProductDto: CreateProductDto, @Req() req: Request) {
    return this.productsService.create(createProductDto, req["decoded"]);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "products found successfully",
    type: [ResponseFindAllProductDto],
  })
  @ApiOperation({ summary: "Get All the Products" })
  findAll(
    @Query() queryFindProductDto: QueryFindProductDto,
    @Req() req: Request,
  ) {
    return this.productsService.findAll(
      queryFindProductDto,
      req["decoded"].id,
      req["decoded"].role,
      false,
    );
  }

  @Get("deadStocks")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "products found successfully",
    type: ResponseFindAllProductDto,
  })
  @ApiOperation({ summary: "Get Dead Stock Products" })
  findDeadStocks(
    @Query() queryFindProductDto: QueryFindProductDto,
    @Req() req: Request,
  ) {
    return this.productsService.findAll(
      queryFindProductDto,
      req["decoded"].id,
      req["decoded"].role,
      true,
    );
  }

  @Get("stats")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "stats found successfully",
    type: ResponseFindProductsStats,
  })
  @ApiOperation({ summary: "Get Products Statistics" })
  findProductsStats(@Req() req: Request) {
    return this.productsService.findProductsStats(
      req["decoded"].id,
      req["decoded"].inventoryId,
      req["decoded"].role,
    );
  }

  @Get("categoriesSoldCount")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "category wise sold count found successfully",
    type: [ResponseFindCategoriesSoldCount],
  })
  @ApiOperation({ summary: "Get Category wise sold count" })
  findCategoryWiseSoldCount(@Req() req: Request) {
    return this.productsService.findCategoryWiseSoldCount(
      req["decoded"].id,
      req["decoded"].inventoryId,
      req["decoded"].role,
    );
  }

  @Get("salesPerMonthForCurrentYear")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "sales per month for current year found successfully",
    type: [ResponseFindSalesPerMonthForCurrentYear],
  })
  @ApiOperation({ summary: "Get Sales Per Month For Current Year" })
  findSalesPerMonthForCurrentYear(@Req() req: Request) {
    return this.productsService.findSalesPerMonthForCurrentYear(
      req["decoded"].id,
      req["decoded"].inventoryId,
      req["decoded"].role,
    );
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product found successfully",
    type: ResponseFindProductDto,
  })
  @ApiOperation({ summary: "Get Single Product by Id" })
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product updated successfully",
    type: ResponseUpdateProductDto,
  })
  @ApiOperation({ summary: "Update Product" })
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product deleted successfully",
    type: ResponseDeleteProductDto,
  })
  @ApiOperation({ summary: "Delete Product" })
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.productsService.remove(id);
  }
}
