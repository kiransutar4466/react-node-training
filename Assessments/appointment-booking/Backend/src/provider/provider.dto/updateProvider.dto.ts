import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Max, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

// export enum Role {
//     PROVIDER = 'provider',
//     ADMIN = 'admin',
//   }
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
 
    
    export class UpdateDto {
        @ApiPropertyOptional({ example: 'John'})
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        firstName?: string;
      
        @ApiPropertyOptional({ example: 'Doe'})
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        lastName?: string;
      
        @ApiPropertyOptional({ example: 'john@gmail.com'})
        @IsOptional()
        @IsEmail()
        @IsNotEmpty()
        @Matches(/^\S.*\S$|^\S$/, { message: 'Field cannot be empty or contain only spaces' })
        email?: string;
      
        @ApiPropertyOptional({ example: 'pass@123' })
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        @MinLength(8)
        @Matches(/^\S.*\S$|^\S$/, { message: 'Field cannot be empty or contain only spaces' })
        password?: string;
      
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

         @ApiProperty({
            example: 'provider',
           required:false,
          })
          @ApiProperty({
            enum: Role,
            enumName: 'Role',
          })
          @IsOptional()
          @IsString()
          @IsNotEmpty()
          @IsEnum(Role)
          role?: Role;
      
        @ApiPropertyOptional({ example: 'pune' })
        @IsOptional()
        @IsString()
        @IsNotEmpty()
        address?: string;

        @ApiPropertyOptional({ example: 'Cardiology'})
        @IsOptional()
        @IsString()
        specialization?: string;
      
        @ApiPropertyOptional({ example: 3 })
        @IsOptional()
        @IsInt()
        @Max(70)
        experience?: number;

        @ApiPropertyOptional({ example: 'MD',required:false })
        @IsOptional()
         @IsNotEmpty()
         @IsString()
         degree?: string;   
      
    }
