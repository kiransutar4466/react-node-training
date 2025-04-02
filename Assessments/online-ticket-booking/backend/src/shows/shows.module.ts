import { Module } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { ShowsController } from './shows.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ShowsController],
  providers: [ShowsService,PrismaClient],
})
export class ShowsModule {}
