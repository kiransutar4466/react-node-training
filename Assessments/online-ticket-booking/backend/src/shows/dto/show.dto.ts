import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetShowQueryInputDto{
    // @ApiProperty()
    // @IsOptional()
    // @IsNumber()
    // @Type(() => Number) 
    // showId ?: number 

    @ApiProperty({required: false, description:"Enter Event Id", type: Number})
    @IsOptional()
    @IsNumber()
    @Type(() => Number) 
    eventId ?: number 

    @ApiProperty({required: false, description:"Enter Event Name", type: String})
    @IsOptional()
    @IsString()
    eventShowDate  ?: string;

    @ApiProperty({required: false, description:"Enter Event Name", type: String})
    @IsOptional()
    @IsString()
    eventName ?: string;
}