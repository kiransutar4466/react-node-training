import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryInputDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    eventName ?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    eventCategory ?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    eventStartDate ?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    eventEndDate ?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Type(() => Number) 
    page : number = 1

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Type(() => Number) 
    limit : number = 10
}
