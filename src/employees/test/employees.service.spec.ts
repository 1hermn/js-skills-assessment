import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../../departments/department.model';
import { Employee } from '../employee.model';
import { EmployeesService } from '../employees.service';

let employeeId: number;

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService],
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
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('getEmployees should return a list of employees if name is not provided', async () => {
    expect((await service.getEmployees())[0]).toBeInstanceOf(Employee);
  });
  it('addEmployee should add a employee', async () => {
    const employee = await service.addEmployee({
      departmentId: 2,
      firstName: 'test',
      lastName: 'test',
      company: 'test',
      position: 'test',
    });
    employeeId = employee.id;
    expect(
      await Employee.findOne({ id: employeeId }, { relations: ['department'] }),
    ).toEqual(employee);
  });
  it('getEmployees should return a list of employees filtered by name if name is provided', async () => {
    expect((await service.getEmployees('test'))[0].firstName).toEqual('test');
  });
  it('get employee should return employee', async () => {
    const employee = await service.getEmployee(employeeId);
    expect(
      await Employee.findOne({ id: employeeId }, { relations: ['department'] }),
    ).toEqual(employee);
  });
  it('delete employee should delete employee', async () => {
    await service.deleteEmployee(employeeId);
    expect(await Employee.findOne({ id: employeeId })).toEqual(undefined);
  });
});
