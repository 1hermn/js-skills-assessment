import { Test, TestingModule } from '@nestjs/testing';
import { Employee } from '../employee.model';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';
jest.mock('../employees.service');
describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });
  describe('root', () => {
    it('should call the service function getEmployees', () => {
      controller.getEmployees();
      expect(service.getEmployees).toHaveBeenCalled();
    });
    it('should call the service function getEmployee(:id)', () => {
      controller.getEmployee(123);
      expect(service.getEmployee).toHaveBeenCalled();
    });
    it('should call the service function addEmployee()', () => {
      controller.addEmployee(
        new Employee(null, null, new Date(), null, null, null),
      );
      expect(service.addEmployee).toHaveBeenCalled();
    });
    it('should call the service function deleteEmployee(:id)', () => {
      controller.deleteEmployee(123);
      expect(service.deleteEmployee).toHaveBeenCalled();
    });
  });
});
