import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ReviewInputDto{
    @ApiProperty({example:1})
    @IsNumber()
    @IsNotEmpty({message:'usedId is required'})
    userId : number

    @ApiProperty({example:1})
    @IsNumber()
    @IsNotEmpty({message:'eventId is required'})
    eventId : number

    @ApiProperty({example:"This event was so nice."})
    @IsString()
    // @IsNotEmpty({message:'review message is required'})
    @IsOptional()
    reviews : string

    @ApiProperty({example:4})
    @IsNumber()
    @IsNotEmpty({message:'rating is required'})
    rating : number

}