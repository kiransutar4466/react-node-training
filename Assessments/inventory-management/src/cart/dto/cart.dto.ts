import {
  IsString,
  IsOptional,
  Min,
  IsInt,
  MaxLength,
  MinLength,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

enum CartStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
}

export class CreateCartItemDto {
  @ApiProperty({ example: "9812f1bf-c9d6-45a7-96c3-8d8sc644d8a3" })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number = 1;
}

export class QueryFindCartItemDto {
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

  @ApiProperty({ required: false, example: "ACTIVE" })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  cartStatus?: CartStatus;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsString()
  @Min(1)
  @Type(() => Number)
  quantity?: number;
}
