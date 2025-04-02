import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService,PrismaClient],
})
export class TicketsModule {}
