/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Employee } from '../../employees/employee.model';
import { Department } from '../department.model';
import { DepartmentsService } from '../departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
let departmentId : number;
let employeeId: number;
describe('DepartmentsService', () => {
  let service: DepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentsService],
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

    service = module.get<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('get departments should return a array of departments', async () => {
    expect((await service.getDepartments()).departments[0]).toBeInstanceOf(Department);
  });
  it('get department should return department', async () => {
    expect(await service.getDepartment(1)).toBeInstanceOf(Department)
  })
  it('add department should add department', async () => {
    const department = await service.add(new Department('fromTest', new Date(), 'fromTest'))
    departmentId = department.id;
    expect(department).toEqual(await Department.findOne({id : department.id}))
  });
  it('add employee by body should add employee', async () => {
    const department = await Department.findOne({id : departmentId});
    const employee = await service.addEmployee(new Employee("test", "test", new Date(), "test", "test", department), departmentId)
    employeeId = employee.id;
    expect(await Employee.findOne({id: employee.id}, { relations: ['department'] })).toEqual(employee)
  });
  it('add employee by id should change employee\'s department', async () => {
    const employee = await Employee.findOne({id: employeeId})
    employee.department = null;
    await employee.save();
    await service.addEmployeeToDepartment(departmentId, employeeId)
    expect((await Employee.findOne({id: employeeId}, { relations: ['department'] })).department.id).toEqual(departmentId)
  });
  it('should throw error', async () => {
    expect(async () => await service.delete(departmentId)).rejects.toThrow(HttpException);
  });
  it('should throw error when delete employee from wrong department', async () => {
    expect(async () => await service.deleteEmployee(employeeId, departmentId + 1)).rejects.toThrow(HttpException);
  });
  it('should delete employee from department', async () => {
    await service.deleteEmployee(employeeId, departmentId)
    expect((await Employee.findOne({id: employeeId}, { relations: ['department'] })).department).toEqual(null);
    await (await Employee.findOne({id: employeeId}, { relations: ['department'] })).remove();
  });
  it('delete should delete department', async () => {
    await service.delete(departmentId)
    expect(await Department.findOne({id: departmentId})).toEqual(undefined);
  });
});
