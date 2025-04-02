import { IsString } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { CreateVendorDto } from "./vendors.dto";

export class ResponseCreateVendorDto {
  @ApiProperty({ example: "vendor created succesfully" })
  @IsString()
  message: string;
}

export class ResponseUpdateVendorDto {
  @ApiProperty({ example: "vendor updated succesfully" })
  @IsString()
  message: string;
}

export class ResponseDeleteVendorDto {
  @ApiProperty({ example: "vendor deleted succesfully" })
  @IsString()
  message: string;
}

export class AdditionalVendorDto {
  @ApiProperty({ example: "9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3" })
  id: string;
}

export class ResponseFindSingleVendorDto extends IntersectionType(
  AdditionalVendorDto,
  CreateVendorDto,
) {}

export class ResponseFindAllVendorDto {
  @ApiProperty({ example: 3 })
  page: number;

  @ApiProperty({ example: 3 })
  totalPages: number;

  @ApiProperty({ example: 2, nullable: true })
  prev: number | null;

  @ApiProperty({ example: null, nullable: true })
  next: number | null;

  @ApiProperty({ type: [ResponseFindSingleVendorDto] })
  data: ResponseFindSingleVendorDto[];
}
