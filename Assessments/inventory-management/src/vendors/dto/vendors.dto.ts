/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
} from "class-validator";
import { ApiProperty, IntersectionType, PartialType } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";

export class CreateVendorDto {
  @ApiProperty({ example: "John" })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName: string;

  @ApiProperty({ example: "Doe" })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName: string;

  @ApiProperty({ example: "johndoe@gmail.com" })
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({ example: "Thinktive Technologies Pvt." })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  companyName: string;

  @ApiProperty({ example: "9876543210" })
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  contactNumber: string;

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

  @ApiProperty({ example: "Pune", default: "My Inventory" })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  inventoryName: string;
}

export class AdditionalVendorDto {
  @ApiProperty({ example: "Pass@123" })
  @IsString()
  @MinLength(8)
  password: string;
}

export class UpdateVendorDto extends IntersectionType(
  PartialType(CreateVendorDto),
  PartialType(AdditionalVendorDto),
) {}

export class QueryFindVendorsDto {
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

  @ApiProperty({ required: false, example: "johndoe@gmail.com" })
  @IsOptional()
  @IsEmail()
  @MinLength(8)
  email: string;

  @ApiProperty({ required: false, example: "John" })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false, example: "Doe" })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false, example: "Thinktive Technologies Pvt." })
  @IsOptional()
  @IsString()
  companyName: string;
}
