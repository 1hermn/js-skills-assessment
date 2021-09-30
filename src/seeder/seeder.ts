import { Injectable, Logger } from '@nestjs/common';
import { EmployeeAndDepartmentSeederService } from './employee.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly service: EmployeeAndDepartmentSeederService,
  ) {}
  async seed() {
    this.service.create(50, 10, 100);
  }
}
