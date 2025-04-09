
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';


export enum Gender {
  MALE = 'MALE',
  male = 'male',
  Male = 'Male',
  FEMALE = 'FEMALE',
  female = 'female',
  Female = 'Female',
  OTHER = 'OTHER',
  
}

export class CreatePatientDto {
  @ApiProperty({
    example: 'vaibhav',
  })
  @IsString()
  @IsNotEmpty()
  
  firstName: string;

  @ApiProperty({
    example: 'kolse',
  })
  @IsString()
  @IsNotEmpty()
  
  lastName: string;

  @ApiProperty({
    example: 'vaibhav@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({enumName:'Gender', enum: Gender})
  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: '9134561677' })
  @IsPhoneNumber('IN')
  @IsString()
  @Matches(/^\S.*\S$|^\S$/, {
    message: 'Field cannot be empty or contain only spaces',
  })
  contactNo: string;

  @ApiProperty({ example: '1995-06-15', description: 'Date of birth in ISO format' })
  @IsNotEmpty()
  @Type(() => Date) 
  @IsDate({ message: 'dateOfBirth must be a valid Date' })
  dateOfBirth: Date;

  @ApiProperty({ example: 'This is a sample remark.', description: 'Additional remarks', type: String })
  @IsString({ message: 'Remark must be a string' }) 
  @IsNotEmpty()
  remark: string;

  @ApiProperty({ example: 'pune' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: '2f06530a-206b-4ad8-bee2-7d3b30581d0e',required:false })
 @IsOptional()
  @IsNotEmpty()
  @IsString()
 
  providerId: string;

 
}


