import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class ShowTicketInputDto{
    @ApiProperty({example:'1'})
    @IsNumber()
    @IsNotEmpty({message:'User id not provided'})
    userId : number

    @ApiProperty({example:'1'})
    @IsNumber()
    @IsNotEmpty({message:'event id not provided'})
    eventId : number

    @ApiProperty({example:'1'})
    @IsNumber()
    @IsNotEmpty({message:'show id not provided'})
    showId : number

    @ApiProperty({example:[12,13,14]})
    @IsArray()
    @IsNotEmpty({message:'selected tickets not provided'})
    selectedTickets : number[]

    @ApiProperty({example:'1'})
    @IsNumber()
    @IsNotEmpty({message:'paid amount not provided'})
    amoutPaid : number
}