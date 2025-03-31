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
  Req,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { ProductsService } from "./products.service";
import {
  CreateProductDto,
  QueryFindProductDto,
  UpdateProductDto,
} from "./dto/products.dto";
import {
  ResponseCreateProductDto,
  ResponseDeleteProductDto,
  ResponseFindProductDto,
  ResponseUpdateProductDto,
} from "./dto/response.dto";
import { Request } from "express";

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
    type: [ResponseFindProductDto],
  })
  @ApiOperation({ summary: "Get All the Products" })
  findAll(@Query() queryFindProductDto: QueryFindProductDto) {
    return this.productsService.findAll(queryFindProductDto);
  }

  @Get("deadStocks")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "products found successfully",
    type: ResponseFindProductDto,
  })
  @ApiOperation({ summary: "Get Dead Stock Products" })
  findDeadStocks(
    @Query() queryFindProductDto: QueryFindProductDto,
    @Req() req: Request,
  ) {
    return this.productsService.findDeadStocks(
      req["decoded"],
      queryFindProductDto,
    );
  }

  @Get(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product found successfully",
    type: ResponseFindProductDto,
  })
  @ApiOperation({ summary: "Get Single Product by Id" })
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product updated successfully",
    type: ResponseUpdateProductDto,
  })
  @ApiOperation({ summary: "Update Product" })
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product deleted successfully",
    type: ResponseDeleteProductDto,
  })
  @ApiOperation({ summary: "Delete Product" })
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }
}
