import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard() {
    return this.dashboardService.getDashboard();
  }
}
