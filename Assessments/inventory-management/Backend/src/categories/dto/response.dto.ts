import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResponseCreateCategoryDto {
  @ApiProperty({ example: "category created succesfully" })
  @IsString()
  message: string;
}

export class ResponseUpdateCategoryDto {
  @ApiProperty({ example: "category updated succesfully" })
  @IsString()
  message: string;
}

export class ResponseDeleteCategoryDto {
  @ApiProperty({ example: "category deleted succesfully" })
  @IsString()
  message: string;
}

export class ResponseFindSingleCategoryDto {
  @ApiProperty({ example: "9812f1bf-c9d6-45a7-96c3-8d8sc644d8a3" })
  id: string;

  @ApiProperty({ example: "Electronics" })
  name: string;
}

export class ResponseFindAllCategoryDto {
  @ApiProperty({ example: 3 })
  page: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 2, nullable: true })
  prev: number | null;

  @ApiProperty({ example: null, nullable: true })
  next: number | null;

  @ApiProperty({ example: ["Cars", "Electronics"] })
  data: string[];
}
