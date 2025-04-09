

import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAppointmentDto {
  @ApiProperty({ example: 'a2be3a0d-f11d-465e-b698-001fa6bf9a0e',required:false})
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  providerId?: string;

  @ApiProperty({ example: 'e2c8767b-bbfb-44fb-8853-c700668d0e44',required:false})
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  patientId?: string;

 @ApiProperty({example:'506c9c67-39f3-41da-a1cf-fdd489a4220c'})
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  slotId:string;

}
