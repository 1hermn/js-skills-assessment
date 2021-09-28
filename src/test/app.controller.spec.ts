import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { DashboardService } from '../app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employees/employee.model';
import { Department } from '../departments/department.model';
jest.mock('../app.service');

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
          synchronize: false,
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
  });
});
