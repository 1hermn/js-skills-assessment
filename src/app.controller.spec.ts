import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createQueryBuilder } from 'typeorm';
import { AppController } from './app.controller';
import { DashboardService } from './app.service';
import { Department } from './departments/department.model';
import { Employee } from './employees/employee.model';
jest.mock('./app.service');

describe('AppController', () => {
  let dashboardService: DashboardService;
  let appController: AppController;

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
      controllers: [AppController],
    }).compile();
    dashboardService = app.get<DashboardService>(DashboardService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should call the service', async () => {
      const dashboard = appController.getDashboard();
      expect(dashboardService.getDashboard).toHaveBeenCalled();
    });
    it('should return Departments and Employees', async () => {
      let result: {
        topFiveDepartments: Department[];
        lastFiveEmployees: Employee[];
      };
      expect(await dashboardService.getDashboard()).toBe(result);
    });
    it('should be defined', () => {
      expect(dashboardService).toBeDefined();
    });
    it('return a value', async () => {
      const dsh = await dashboardService.getDashboard();
      expect(dashboardService.getDashboard).toHaveReturned();
    });
  });
});
