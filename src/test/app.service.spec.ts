import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from '../app.service';
import { Department } from '../departments/department.model';
import { Employee } from '../employees/employee.model';

describe('AppService', () => {
  let dashboardService: DashboardService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'test',
          database: 'jsskill',
          logging: false,
          synchronize: true,
          entities: [Employee, Department],
          keepConnectionAlive: true,
        }),
      ],
      providers: [DashboardService],
    }).compile();
    dashboardService = app.get<DashboardService>(DashboardService);
  });

  describe('root', () => {
    it('should return Departments and Employees', async () => {
      const dashboard = {
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
      expect(await dashboardService.getDashboard()).toEqual(dashboard);
    });
  });
});
