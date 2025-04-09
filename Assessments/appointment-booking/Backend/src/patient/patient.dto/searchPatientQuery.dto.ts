import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from "class-validator";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}
export class SearchPatientQueryDto{
    @ApiProperty({
        name: 'providerId',
        required: false,
        example: 'a2be3a0d-f11d-465e-b698-001fa6bf9a0e',
      })
      @IsOptional()
      @IsString()
      @IsUUID()
      providerId?:string;


      @ApiProperty({ 
        name: 'email',
        required: false,
      })
      @IsOptional()
      @IsEmail()
      email?:string;  


      @ApiProperty({
        name: 'gender',
        required: false,
      })
      @IsOptional()
      @IsString()
      @IsEnum(Gender)
      gender?:Gender;

      @ApiProperty({
        name: 'firstName',
        required: false,
      })
      @IsOptional()
      @IsString()
      firstName?:string;

      @ApiProperty({
        name:'page',
        required:false,
      })
      @IsOptional()
      @IsInt()
      @Min(1)
      @Type(()=>Number)
      page:number = 1;

      @ApiProperty({
        name:'limit',
        required:false,
      })
      @IsOptional()
      @IsInt()
      @Min(1)
      @Type(()=>Number)
      limit:number = 10;

}