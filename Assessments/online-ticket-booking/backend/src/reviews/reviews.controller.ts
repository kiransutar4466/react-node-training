import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewInputDto } from './dto/review.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiOperation({summary:'Insert reviews'})
  @Post()
  async addReview(@Body() reviewInputDto:ReviewInputDto){
    return this.reviewsService.addReview(reviewInputDto);
  }

  @ApiOperation({summary:'fetch all reviews'})
  @ApiQuery({name:'eventId',required:false,description:'eventId to find review'})
  @Get()
  async getAllReviews(@Query('eventId') eventId:number){
    return this.reviewsService.getAllReviews(eventId)
  }

  @ApiOperation({summary:'fetch reviews by reviewId'})
  @Get('/:id')
  async getReviewById(@Param('id') id:number){
    return this.reviewsService.getReviewById(id)
  }
}
