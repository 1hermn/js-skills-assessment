import { Injectable, Logger } from '@nestjs/common';
import { Employee } from './employee.model';
import { Department } from '../departments/department.model';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);
  async getEmployees(name?: string) {
    if (typeof name !== 'undefined') {
      return await Employee.find({ firstName: name });
    } else {
      return await Employee.find();
    }
  }
  async addEmployee(body: any) {
    const department = await Department.findOneOrFail({
      id: body.departmentId,
    });
    const employee = new Employee(
      body.firstName,
      body.lastName,
      new Date(),
      body.company,
      body.position,
      department,
    );
    await employee.save();
    return employee;
  }
  async deleteEmployee(employeeId: number) {
    const employee = await Employee.findOneOrFail({ id: employeeId });
    await employee.remove();
    return 'Employee successfully removed';
  }
  async getEmployee(id: number) {
    const employee = await Employee.findOneOrFail(
      { id: id },
      { relations: ['department'] },
    );
    return employee;
  }
}
