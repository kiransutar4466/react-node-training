import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { CategoriesService } from "./categories.service";
import {
  CreateCategoryDto,
  QueryFindCategoriesDto,
} from "./dto/categories.dto";
import {
  ResponseCreateCategoryDto,
  ResponseDeleteCategoryDto,
  ResponseFindAllCategoryDto,
  ResponseUpdateCategoryDto,
} from "./dto/response.dto";

@ApiBearerAuth()
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "category created successfully",
    type: ResponseCreateCategoryDto,
  })
  @ApiOperation({ summary: "Create Category" })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "categories found successfully",
    type: ResponseFindAllCategoryDto,
  })
  @ApiOperation({ summary: "Get All the Categories" })
  findAll(@Query() queryFindCategoriesDto: QueryFindCategoriesDto) {
    return this.categoriesService.findAll(queryFindCategoriesDto);
  }

  @Put(":id")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "category updated successfully",
    type: ResponseUpdateCategoryDto,
  })
  @ApiOperation({ summary: "Update Category" })
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
    type: ResponseDeleteCategoryDto,
  })
  @ApiOperation({ summary: "Delete Category" })
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
