import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getDashboard() : object {
    return {
      "top-five-employees": [],
      "five-last-employees": []
    }
  }
}
