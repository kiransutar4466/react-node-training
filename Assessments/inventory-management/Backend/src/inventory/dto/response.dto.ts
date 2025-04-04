import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus, PaymentStatus } from "src/orders/dto/orders.dto";

export class ResponseUpdateInventoryDto {
  @ApiProperty({ example: "inventory updated succesfully" })
  @IsString()
  message: string;
}

export class ResponseDeleteInventoryDto {
  @ApiProperty({ example: "inventory deleted succesfully" })
  @IsString()
  message: string;
}

export class ResponseFindSingleInventoryDto {
  @ApiProperty({ example: "9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3" })
  id: string;

  @ApiProperty({ example: "My Inventory" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Pune" })
  @IsString()
  city: string;

  @ApiProperty({ example: "456854" })
  @IsString()
  pinCode: string;

  @ApiProperty({ example: "John Doe" })
  @IsString()
  vendorName: string;

  @ApiProperty({ example: 10 })
  @IsString()
  totalStocks: number;
}

export class ResponseFindAllInventoryDto {
  @ApiProperty({ example: 3 })
  page: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 2, nullable: true })
  prev: number | null;

  @ApiProperty({ example: null, nullable: true })
  next: number | null;

  @ApiProperty({ type: [ResponseFindSingleInventoryDto] })
  data: ResponseFindSingleInventoryDto[];
}

export class ResponseFindSingleInventorySingleOrderDto {
  @ApiProperty({ example: "9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3" })
  id: string;

  @ApiProperty({ example: "9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3" })
  productId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 99 })
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ example: "PENDING" })
  @IsString()
  orderStatus: OrderStatus;

  @ApiProperty({ example: "PENDING" })
  @IsString()
  paymentStatus: PaymentStatus;

  @ApiProperty({ example: "Apple Vision Pro" })
  @IsString()
  productName: string;

  @ApiProperty({ example: "John Doe" })
  @IsString()
  orderedBy: string;

  @ApiProperty({ example: "Pune - 456255" })
  @IsString()
  address: string;
}

export class ResponseFindSingleInventoryAllOrderDto {
  @ApiProperty({ example: 3 })
  page: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 2, nullable: true })
  prev: number | null;

  @ApiProperty({ example: null, nullable: true })
  next: number | null;

  @ApiProperty({ type: [ResponseFindSingleInventorySingleOrderDto] })
  data: ResponseFindSingleInventorySingleOrderDto[];
}
