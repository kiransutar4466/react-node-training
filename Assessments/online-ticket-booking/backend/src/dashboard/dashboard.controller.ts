import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { EventsService } from 'src/events/events.service';
import { QueryInputDto } from 'src/events/dto/query.param.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorator/roles.decorator';

// @UseGuards(AuthGuard)
// @Roles('admin')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly eventService : EventsService
  ) {}

  @Get()
  async getDashboardData(){
    // return this.eventService.getEvents(queryInputDto);
    return this.dashboardService.getDashboardData();
  }
}
