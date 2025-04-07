import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { EventsService } from 'src/events/events.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService,EventsService,PrismaClient],
})
export class DashboardModule {}
