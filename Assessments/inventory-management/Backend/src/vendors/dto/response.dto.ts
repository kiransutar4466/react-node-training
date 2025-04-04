import { IsEmail, IsString } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { CreateVendorDto } from "./vendors.dto";

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

export class AdditionalCreateVendorDto {
  @ApiProperty({ example: "4d0fd8cb-7f68-41c2-b381-483e729dc6bf" })
  @IsString()
  id: string;

  @ApiProperty({ example: "Jack" })
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Sparrow" })
  @IsString()
  lastName: string;

  @ApiProperty({ example: "js@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "VENDOR" })
  @IsString()
  role: string;

  @ApiProperty({ example: "Pirate Inc." })
  @IsString()
  companyName: string;

  @ApiProperty({ example: "9076543210" })
  @IsString()
  contactNumber: string;

  @ApiProperty({ example: "2025-04-04T07:09:13.395Z" })
  @IsString()
  createdAt: string;

  @ApiProperty({ example: "2025-04-04T07:09:13.395Z" })
  @IsString()
  updatedAt: string;
}

export class ResponseCreateVendorDto {
  @ApiProperty({ example: "vendor created succesfully" })
  @IsString()
  message: string;

  @ApiProperty({ type: AdditionalCreateVendorDto })
  data: AdditionalCreateVendorDto;
}
