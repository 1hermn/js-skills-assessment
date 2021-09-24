import { Injectable } from '@nestjs/common';
import { Employee } from './employees/employee.model';
import { Department } from './departments/department.model';

@Injectable()
export class DashboardService {
  async getDashboard() {
    return {
      topFiveDepartments: await Department.createQueryBuilder()
        .leftJoin('Department.employees', 'Employees')
        .addSelect('COUNT(Employees.id) as employeesCount')
        .loadRelationCountAndMap(
          'Department.employeesCount',
          'Department.employees',
        )
        .groupBy('Department.id')
        .orderBy('employeesCount', 'DESC')
        .limit(5)
        .getMany(),
      lastFiveEmployees: await Employee.createQueryBuilder()
        .orderBy('Employee.date', 'DESC')
        .limit(5)
        .getMany(),
    };
  }
}
