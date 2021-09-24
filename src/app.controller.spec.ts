import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DashboardService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DashboardService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController).toBe({
        'top-five-employees': [],
        'five-last-employees': [],
      });
    });
  });
});
