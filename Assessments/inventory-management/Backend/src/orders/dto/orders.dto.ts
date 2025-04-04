import {
  IsString,
  IsOptional,
  Min,
  IsInt,
  MaxLength,
  MinLength,
  IsUUID,
  IsNumber,
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
  @ApiProperty({ example: 1 })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  orderStatus: OrderStatus;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  paymentStatus: PaymentStatus;
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
}
