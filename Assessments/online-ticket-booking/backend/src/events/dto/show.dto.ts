import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ShowInputDto{
    @IsNumber()
    @IsNotEmpty()
    eventId : number

    @IsString()
    @IsNotEmpty()
    showStartTime : string

    @IsString()
    @IsNotEmpty()
    showEndTime : string

    @IsDate()
    @IsNotEmpty()
    showDate: Date

    @IsNumber()
    @IsNotEmpty()
    showTotalTickets : number

    @IsArray()
    @IsNotEmpty()
    showSelectedTickets : string[]

    @IsNumber()
    @IsNotEmpty()
    showAvailableTickets : number
}