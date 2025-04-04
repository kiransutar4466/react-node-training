import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { CreateProductDto } from "./products.dto";

export class ResponseCreateProductDto {
  @ApiProperty({ example: "product created successfully" })
  @IsString()
  message: string;
}

export class ResponseUpdateProductDto {
  @ApiProperty({ example: "product updated succesfully" })
  @IsString()
  message: string;
}

export class ResponseDeleteProductDto {
  @ApiProperty({ example: "product deleted succesfully" })
  @IsString()
  message: string;
}

export class AdditionalProductDto {
  @ApiProperty({ example: "9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3" })
  id: string;

  @ApiProperty({ example: "LOW_STOCK" })
  stockStatus: string;

  @ApiProperty({ example: 5 })
  soldCount: number;

  @ApiProperty({ example: "7c640a85-19d5-4947-b9fa-c52c1b01dd5b" })
  inventoryId: string;

  @ApiProperty({ example: "My Inventory" })
  inventoryName: string;
}

export class ResponseFindProductDto extends IntersectionType(
  CreateProductDto,
  AdditionalProductDto,
) {}

export class ResponseFindAllProductDto {
  @ApiProperty({ example: 3 })
  page: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 2, nullable: true })
  prev: number | null;

  @ApiProperty({ example: null, nullable: true })
  next: number | null;

  @ApiProperty({ type: [ResponseFindProductDto] })
  data: ResponseFindProductDto[];
}

export class ResponseFindProductsStats {
  @ApiProperty({ example: 4 })
  totalProducts: number;

  @ApiProperty({ example: 100 })
  totalSales: number;

  @ApiProperty({ example: 10 })
  salesThisMonth: number;
}
