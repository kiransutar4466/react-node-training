import { IsString } from 'class-validator';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateVendorDto } from './vendors.dto';

export class ResponseCreateVendorDto {
  @ApiProperty({ example: 'user created succesfully' })
  @IsString()
  message: string;
}

export class ResponseUpdateVendorDto {
  @ApiProperty({ example: 'user updated succesfully' })
  @IsString()
  message: string;
}

export class ResponseDeleteVendorDto {
  @ApiProperty({ example: 'user deleted succesfully' })
  @IsString()
  message: string;
}

export class AdditionalVendorDto {
  @ApiProperty({ example: '9818f1bf-c9d6-45a7-96c3-8d8dc644d8a3' })
  id: string;

  @ApiProperty({ example: '2025-03-21T11:39:14.095Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-03-21T11:39:14.095Z' })
  updatedAt: string;
}

export class ResponseFindVendorDto extends IntersectionType(
  OmitType(CreateVendorDto, ['password'] as const),
  AdditionalVendorDto,
) {}
