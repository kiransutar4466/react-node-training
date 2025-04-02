import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResponseCreateCartItemDto {
  @ApiProperty({ example: "cart item created succesfully" })
  @IsString()
  message: string;
}

export class ResponseUpdateCartItemDto {
  @ApiProperty({ example: "cart updated succesfully" })
  @IsString()
  message: string;
}

export class ResponseDeleteCartItemDto {
  @ApiProperty({ example: "cart deleted succesfully" })
  @IsString()
  message: string;
}

export class ResponseFindSingleCartItemDto {
  @ApiProperty({ example: "9812f1bf-c9d6-45a7-96c3-8d8sc644d8a3" })
  id: string;

  @ApiProperty({ example: "4691f1bf-c9d6-45a7-96c3-8d8sc644d8f2" })
  productId: string;

  @ApiProperty({ example: "Apple Vision Pro" })
  productName: string;

  @ApiProperty({ example: 1 })
  quantity: number;

  @ApiProperty({ example: 100 })
  price: number;
}

export class ResponseFindAllCartItemDto {
  @ApiProperty({ example: 3 })
  page: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 2, nullable: true })
  prev: number | null;

  @ApiProperty({ example: null, nullable: true })
  next: number | null;

  @ApiProperty({ example: 100 })
  totalPrice: number;

  @ApiProperty({ type: [ResponseFindSingleCartItemDto] })
  data: ResponseFindSingleCartItemDto[];
}
