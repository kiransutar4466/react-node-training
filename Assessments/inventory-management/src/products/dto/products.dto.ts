/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  Min,
  IsNumber,
  IsInt,
  IsArray,
} from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";

enum StockStatus {
  OUT_OF_STOCK = "OUT_OF_STOCK",
  IN_STOCK = "IN_STOCK",
  LOW_STOCK = "LOW_STOCK",
}

enum SortBy {
  price = "price",
  quantity = "quantity",
  soldCount = "soldCount",
}

enum OrderBy {
  desc = "desc",
  asc = "asc",
}

export class CreateProductDto {
  @ApiProperty({ example: "Spaceship" })
  @IsString()
  @MinLength(1)
  @MaxLength(256)
  name: string;

  @ApiProperty({ example: "Explore the Cosmos with this Spaceship" })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 79999.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 18 })
  @IsNumber()
  @Min(5)
  quantity: number;

  @ApiProperty({ example: ["Electronics"] })
  @IsArray()
  categories: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class QueryFindProductDto {
  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  perPage: number = 10;

  @ApiProperty({ required: false, example: "Electronics" })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({ required: false, example: "VR" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    example: "1a93ec2c-49ee-48ad-9979-e237dbaba6ce",
  })
  @IsOptional()
  @IsString()
  inventoryId?: string;

  @ApiProperty({
    required: false,
    example: "IN_STOCK",
    enumName: "stockStatus",
    enum: StockStatus,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toUpperCase().trim())
  stockStatus: StockStatus;

  @ApiProperty({
    required: false,
    example: "quantity",
    enumName: "sortBy",
    enum: SortBy,
  })
  @IsOptional()
  @IsString()
  sortBy: SortBy;

  @ApiProperty({
    required: false,
    example: "asc",
    enumName: "orderBy",
    enum: OrderBy,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  orderBy: OrderBy;
}
