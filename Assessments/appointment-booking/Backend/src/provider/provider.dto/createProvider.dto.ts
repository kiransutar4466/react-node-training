import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export enum Role {
  Provider = 'Provider',
  PROVIDER = 'PROVIDER',
  provider = 'provider',
  Admin = 'Admin',
  ADMIN = 'ADMIN',
  admin = 'admin',
}
export enum Gender {
  MALE = 'MALE',
  male = 'male',
  Male = 'Male',
  FEMALE = 'FEMALE',
  female = 'female',
  Female = 'Female',
  OTHER = 'OTHER',
  
}


export class CreateProviderDto {
  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^\S.*\S$|^\S$/, {
    message: 'Field cannot be empty or contain only spaces',
  })
  email: string;

  @ApiProperty({
    example: 'pass@123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^\S.*\S$|^\S$/, {
    message: 'Field cannot be empty or contain only spaces',
  })
  password: string;

  @ApiProperty({enumName:'Gender', enum: Gender})
  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ example: '9134561677' })
  @IsPhoneNumber('IN')
  @IsString()
  contactNo: string;

  @ApiProperty({
    example: 'provider',
  })
  @ApiProperty({
    enum: Role,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ example: 'pune' })
  @IsNotEmpty()
  @IsString()
 
  address: string;

  @ApiProperty({ example: 'therapists' })
  @IsNotEmpty()
  @IsString()
 
  specialization: string;

  @ApiProperty({ example: 4 })
  @IsNotEmpty()
  @IsNumber()
  @Max(70)
  experience: number;

  @ApiProperty({ example: 'MD',required:false })
  @IsOptional()
   @IsNotEmpty()
   @IsString()
  
   degree: string;
}

// export class LoginAuthDto {
//   @ApiProperty({ example: 'sanket@gmail.com', description: 'User email' })
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @ApiProperty({ example: 'pass@123', description: 'User password' })
//   @IsString()
//   @MinLength(8)
//   @IsNotEmpty()
//   password: string;
// }
