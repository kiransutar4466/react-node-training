import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum Gender {
    MALE = 'MALE',
    Male = 'Male',
    male = 'male',
    FEMALE = 'FEMALE',
    Female = 'Female',
    female = 'female',
    OTHER = 'OTHER',
    other = 'other',
    Other = 'Other'

}
export class SearchQueryDto{
    @ApiProperty({
        name: 'specialization',
        required: false,
        example: 'therapists',
      })
      @IsOptional()
      @IsString()
      specialization?:string;


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