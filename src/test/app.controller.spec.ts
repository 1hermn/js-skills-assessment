import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { DashboardService } from '../app.service';
jest.mock('../app.service');

describe('AppController', () => {
  let dashboardService: DashboardService;
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
