import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdateInventoryDto {
  @ApiProperty({ example: "My Inventory", default: "My Inventory" })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: "Pune" })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  city: string;

  @ApiProperty({ example: "468564" })
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  pinCode: string;
}

export class QueryFindInventorysDto {
  @ApiProperty({ required: true, example: 1, default: "1" })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ required: true, example: 10, default: "10" })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  perPage: number = 10;

  @ApiProperty({ required: false, example: "Inventory" })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;
}
