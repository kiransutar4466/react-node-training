import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ReviewInputDto } from './dto/review.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ReviewsService {
    private readonly logger = new Logger();

    constructor(private readonly prismaClient: PrismaClient) {}

    async addReview(reviewInputDto:ReviewInputDto){
        try{
            await this.prismaClient.reviews.create({
                data:reviewInputDto
            });

            this.logger.log("Review added succesfully.")
            return{
                message: 'Review added succesfully',
                statusCode : HttpStatus.CREATED
            }
        }catch(error){
            this.logger.error("Error in add review");
            throw error;
        }
    }

    async getReviewById(id:number){
        try{
            const reviewsById = await this.prismaClient.reviews.findFirst({
                where:{
                    id
                },
            });

            if(!reviewsById){
                this.logger.error("No review found for provided id");
                throw new HttpException('No review found for provided id',HttpStatus.NOT_FOUND);
            }

            return{
                message:'Reviews fetched succsfully',
                statusCode: HttpStatus.OK,
                data : reviewsById
            }
        }catch(error){
            this.logger.error("Error in fetch reviews");
            throw error;
        }
    }

    async getAllReviews(eventId:number){
        try{
            const whereCondition : any = {}; 

            const reviewFound = await this.prismaClient.reviews.findFirst({
                where:{
                    eventId
                }
            });

            if(!reviewFound){
                // this.logger.error("No review found for provided event id");
                // throw new HttpException('No review found for provided event id',HttpStatus.NOT_FOUND);
                return{
                    message: 'All reviews detail fetched succesfully',
                    statusCode : HttpStatus.OK,
                    data : []
                }
            }

            if(eventId){
                whereCondition.eventId = eventId
            }

            const getAllReviews = await this.prismaClient.reviews.findMany({
                where: whereCondition,
                select : {
                    reviews : true,
                    rating : true,
                    user:{
                        select:{
                            firstName : true,
                            lastName : true
                        }
                    }
                }
            });

            return{
                message: 'All reviews detail fetched succesfully',
                statusCode : HttpStatus.OK,
                data : getAllReviews
            }
        }catch(error){
            this.logger.error("Error in fetching reviews");
            throw error;
        }
    }
}
