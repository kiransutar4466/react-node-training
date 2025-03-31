import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
  CreateCategoryDto,
  QueryFindCategoriesDto,
} from "./dto/categories.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "product created successfully",
  })
  @ApiOperation({ summary: "Create Category" })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "categories found successfully",
  })
  @ApiOperation({ summary: "Get All the Categories" })
  findAll(@Query() queryFindCategoriesDto: QueryFindCategoriesDto) {
    return this.categoriesService.findAll(queryFindCategoriesDto);
  }

  @Patch(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "product updated successfully",
  })
  @ApiOperation({ summary: "Update Product" })
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "category deleted successfully",
  })
  @ApiOperation({ summary: "Delete Category" })
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
