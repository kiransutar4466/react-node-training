import { IsOptional, Min, IsInt, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateCartItemDto {
  @ApiProperty({ example: "9d0667ba-1988-4bf9-9a47-c5726dc2d35a" })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number = 1;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class QueryFindCartItemDto {
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

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity?: number;
}
