import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateVendorDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @ApiProperty({ example: 'Pass@123' })
  @IsString()
  password: string;
}

export class UpdateVendorDto extends PartialType(CreateVendorDto) {}

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

  @ApiProperty({ required: false, example: 'johndoe@gmail.com' })
  @IsOptional()
  @IsEmail()
  @MinLength(8)
  email: string;

  @ApiProperty({ required: false, example: 'John' })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false, example: 'Doe' })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false, example: 'John' })
  @IsOptional()
  @IsString()
  companyName: string;
}
