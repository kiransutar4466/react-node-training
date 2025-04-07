import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { OrderStatus, PaymentStatus } from "./orders.dto";

export class ResponseCreateOrdersDto {
  @ApiProperty({ example: "orders placed succesfully" })
  @IsString()
  message: string;
}

export class ResponseUpdateOrderItemDto {
  @ApiProperty({ example: "order item updated succesfully" })
  @IsString()
  message: string;
}

export class ResponseCancelOrderItemDto {
  @ApiProperty({ example: "order item cancelled succesfully" })
  @IsString()
  message: string;
}

export class ResponseDeleteOrderItemDto {
  @ApiProperty({ example: "order item deleted succesfully" })
  @IsString()
  message: string;
}

export class ResponseFindSingleOrderItemDto {
  @ApiProperty({ example: "9812f1bf-c9d6-45a7-96c3-8d8sc644d8a3" })
  id: string;

  @ApiProperty({ example: "4691f1bf-c9d6-45a7-96c3-8d8sc644d8f2" })
  productId: string;

  @ApiProperty({ example: "Apple Vision Pro" })
  productName: string;

  @ApiProperty({ example: 1 })
  quantity: number;

  @ApiProperty({ example: 100 })
  totalPrice: number;

  @ApiProperty({ example: "PENDING" })
  orderStatus: OrderStatus;

  @ApiProperty({ example: "PENDING" })
  paymentStatus: PaymentStatus;

  @ApiProperty({ example: '"2025-04-06T15:01:19.618Z"' })
  createdAt: Date;
}

export class ResponseFindAllOrdersDto {
  @ApiProperty({ example: 3 })
  page: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 7 })
  totalCount: number;

  @ApiProperty({ example: 2, nullable: true })
  prev: number | null;

  @ApiProperty({ example: null, nullable: true })
  next: number | null;

  @ApiProperty({ example: 100 })
  totalPrice: number;

  @ApiProperty({ type: [ResponseFindSingleOrderItemDto] })
  data: ResponseFindSingleOrderItemDto[];
}
