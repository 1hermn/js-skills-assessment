import { Test, TestingModule } from '@nestjs/testing';
import { Employee } from '../../employees/employee.model';
import { Department } from '../department.model';
import { DepartmentsController } from '../departments.controller';
import { DepartmentsService } from '../departments.service';
jest.mock('../departments.service');

describe('DepartmentsController', () => {
  let controller: DepartmentsController;
  let service: DepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [DepartmentsService],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
    service = module.get<DepartmentsService>(DepartmentsService);
  });
  describe('root', () => {
    it('should call the service.gerDepartments', async () => {
      controller.getDepartments();
      expect(service.getDepartments).toHaveBeenCalled();
    });
    it('should call the service.getDepartment', async () => {
      controller.getDepartment(1);
      expect(service.getDepartment).toHaveBeenCalled();
    });
    it('should call the service.add and service.delete', async () => {
      controller.add(new Department('fromTest', new Date(), 'fromTest'));
      expect(service.add).toHaveBeenCalled();
      controller.delete(1);
      expect(service.delete).toHaveBeenCalled();
    });
    it('should call the service.addEmployee', async () => {
      controller.addEmployee(
        new Employee(
          'test',
          'test',
          new Date(),
          'test',
          'test',
          new Department('fromTest', new Date(), 'fromTest'),
        ),
        1,
      );
      expect(service.addEmployee).toHaveBeenCalled();
    });
    it('should call the service.addEmployeeToDepartment', async () => {
      controller.addEmployeeToDepartment(1, 1);
      expect(service.addEmployeeToDepartment).toHaveBeenCalled();
    });
    it('should call the service.deleteEmployee', async () => {
      controller.deleteEmployee(1, 1);
      expect(service.deleteEmployee).toHaveBeenCalled();
    });
  });
});
