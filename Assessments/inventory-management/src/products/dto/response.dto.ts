import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { CreateProductDto } from "./products.dto";

export class ResponseCreateProductDto {
  @ApiProperty({ example: "product created successfully" })
  @IsString()
  message: string;
}

export class ResponseUpdateProductDto {
  @ApiProperty({ example: "product updated succesfully" })
  @IsString()
  message: string;
}

export class ResponseDeleteProductDto {
  @ApiProperty({ example: "product deleted succesfully" })
  @IsString()
  message: string;
}

export class AdditionalProductDto {
  @ApiProperty({ example: "9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3" })
  id: string;

  @ApiProperty({ example: "2025-03-21T11:39:14.095Z" })
  createdAt: string;

  @ApiProperty({ example: "2025-03-21T11:39:14.095Z" })
  updatedAt: string;
}

export class ResponseFindProductDto extends IntersectionType(
  CreateProductDto,
  AdditionalProductDto,
) {}
