import { ApiProperty } from "@nestjs/swagger";
import { IsISO8601, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAvailibilityDto {


    @ApiProperty({
        description: 'Provider ID (UUID format)',
        example: 'a2be3a0d-f11d-465e-b698-001fa6bf9a0e',
      })
      @IsString()
      @IsNotEmpty()
      @IsUUID()
      providerId: string;
    
      @ApiProperty({
        description: 'Appointment start time (ISO 8601 format with timezone)',
        example: '2025-04-05T13:00:00.000+05:30',
      })
      @IsISO8601()
      @IsNotEmpty()
      start: string;
    
      @ApiProperty({
        description: 'Appointment end time (ISO 8601 format with timezone)',
        example: '2025-04-05T17:00:00.000+05:30',
      })
      @IsISO8601()
      @IsNotEmpty()
      end: string;
   
      @ApiProperty({
        example: '30 min',
      })
      @IsString()
      @IsNotEmpty()
      duration: string;
   
}
