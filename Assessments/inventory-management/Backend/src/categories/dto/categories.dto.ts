import {
  IsString,
  IsOptional,
  Min,
  IsInt,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateCategoryDto {
  @ApiProperty({ example: "Mobile" })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;
}

export class QueryFindCategoriesDto {
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

  @ApiProperty({ required: false, example: "VR" })
  @IsOptional()
  @IsString()
  name?: string;
}
