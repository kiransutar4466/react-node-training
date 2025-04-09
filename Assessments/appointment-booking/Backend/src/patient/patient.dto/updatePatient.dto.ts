import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxDate,
} from 'class-validator';
import { Type } from 'class-transformer';
export enum Gender {
  MALE = 'MALE',
  male = 'male',
  Male = 'Male',
  FEMALE = 'FEMALE',
  female = 'female',
  Female = 'Female',
  OTHER = 'OTHER',
  
}

export class UpdatePatientDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiPropertyOptional({ example: 'john@gmail.com' })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiPropertyOptional({enumName:'Gender', enum: Gender})
  @IsOptional()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender?: Gender;

  @ApiPropertyOptional({ example: '1234567890' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  contactNo?: string;

  @ApiPropertyOptional({
    example: '"1995-06-15"',
  })
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  dateOfBirth?: Date;

  @ApiPropertyOptional({
    example: 'This is a sample remark.',
    description: 'Additional remarks',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'Remark must be a string' })
  @IsNotEmpty()
  remark?: string;

  @ApiPropertyOptional({ example: 'pune' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '2f06530a-206b-4ad8-bee2-7d3b30581d0e' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  providerId?: string;
}
