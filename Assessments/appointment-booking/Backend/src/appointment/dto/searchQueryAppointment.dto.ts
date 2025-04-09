import { ParseUUIDPipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class SearchQueryAppointmentDto {
  @ApiProperty({
    name: 'patientId',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  patientId?: string;

  @ApiProperty({
    name: 'providerId',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  providerId?: string;

  // @ApiProperty({ example: '2025-04-01', required:false })
  // @IsNotEmpty()
  // @IsOptional()
  // // @IsDateString()
  // @Transform(({ value }) => new Date(value))
  // date?: Date;

  @ApiProperty({ example: '2025-04-01', required:false })
  @IsNotEmpty()
  @IsOptional()
  // @IsDateString()
  @Transform(({ value }) => new Date(value))
  date?: Date;

  @ApiProperty({ example: '2025-04-01', required:false })
  @IsNotEmpty()
  @IsOptional()
  // @IsDateString()
  @Transform(({ value }) => new Date(value))
  endDate?: Date;


  @ApiProperty({
    name: 'page',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    name: 'limit',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;


}
