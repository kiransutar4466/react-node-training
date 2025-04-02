import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsString, MaxLength } from "class-validator";

export class EventInputDto{
    @ApiProperty({example:'1'})
    @IsNumber()
    @IsNotEmpty({message:'User id not provided'})
    userId : number

    @ApiProperty({example:'Demo'})
    @IsString()
    @IsNotEmpty({message:'Event name is required'})
    @MaxLength(50,{message:"Event name length must not exceed 50 character."})
    eventName : string

    @ApiProperty({example:'This is an demo event'})
    @IsString()
    @IsNotEmpty({message:'Event description is required'})
    eventDescription : string

    @ApiProperty({example:'Funny'})
    @IsString()
    @IsNotEmpty({message:'Event category is required'})
    eventCategory : string

    @ApiProperty({example:'2025-03-28'})
    @IsDate()
    @IsNotEmpty({message:'Event start date is required'})
    @Type(()=>Date)
    eventStartDate : Date

    @ApiProperty({example:'2025-03-28'})
    @IsDate()
    @IsNotEmpty({message:'Event end date is required'})
    @Type(()=>Date)
    eventEndDate : Date

    @ApiProperty({example: [
        {"day": "monday", "startTime": "09:00 AM", "endTime": "12:00 PM"}
      ],})
    @IsArray()
    eventSlots : any

    @ApiProperty({example:100})
    @IsNumber()
    @IsNotEmpty({message:'Event price is required'})
    eventPrice : number

    @ApiProperty({example:100})
    @IsNumber()
    @IsNotEmpty({message:'Total number of seats is required'})
    eventTotalSeats : number

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Event image required'})
    eventImage : string  
}

export class UpdateEventDto extends PartialType(EventInputDto){}
