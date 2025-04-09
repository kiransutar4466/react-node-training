import { Controller, Get,  Req} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}



  @ApiBearerAuth()
  @Get()
  async findAll(@Req() request:any) {
    return this.dashboardService.findAll(request.user);
  }
}
