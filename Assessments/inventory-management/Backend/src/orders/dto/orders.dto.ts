import {
  IsString,
  IsOptional,
  Min,
  IsInt,
  MaxLength,
  MinLength,
  IsUUID,
  IsNumber,
  IsDateString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}

export enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export class CreateOrderItemDto {
  @ApiProperty({ example: "9812f1bf-c9d6-45a7-96c3-8d8sc644d8a3" })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;
}

export class UpdateOrderItemDto {
  @ApiProperty({ example: "DELIVERED" })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  orderStatus: OrderStatus;

  @ApiProperty({ example: "PAID" })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  paymentStatus: PaymentStatus;
}

export class QueryFindSingleOrderDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  search: string;
}

export class QueryFindOrdersDto {
  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ required: true, example: 10 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  perPage: number = 10;

  @ApiProperty({ required: false, example: "Apple" })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  search?: string;

  @ApiProperty({ required: false, example: "2025-01-01" })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false, example: "2025-04-01" })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
