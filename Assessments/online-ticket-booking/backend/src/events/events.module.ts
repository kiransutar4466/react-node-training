import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [EventsController],
  providers: [EventsService,PrismaClient],
  exports: [EventsService]
})
export class EventsModule {}
