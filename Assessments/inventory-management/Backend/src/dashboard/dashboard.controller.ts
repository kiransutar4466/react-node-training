/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, HttpStatus, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

import { DashboardService } from "./dashboard.service";
import { ResponseDashboardDto } from "./dto/response.dto";

@ApiBearerAuth()
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "dashboard info found successfully",
    type: ResponseDashboardDto,
  })
  @ApiOperation({ summary: "Get Dashboard Info" })
  findInfo(@Req() req: Request) {
    return this.dashboardService.findInfo(
      req["decoded"].id,
      req["decoded"].inventoryId,
      req["decoded"].role,
    );
  }
}
