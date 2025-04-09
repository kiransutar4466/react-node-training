import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MinDate,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'ffecd974-5a7b-4cfc-9e9a-8652a375927b' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @ApiProperty({ example: '506c9c67-39f3-41da-a1cf-fdd489a4220c' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  patientId: string;

  @ApiProperty({example:'506c9c67-39f3-41da-a1cf-fdd489a4220c'})
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  slotId:string;
}
