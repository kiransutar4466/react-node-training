import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
