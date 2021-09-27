import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Employee } from 'src/employees/employee.model';
import { Department } from './department.model';
import { ApiAnswer } from 'src/apianswer.class';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);
  async getDepartments() {
    const departments = await Department.createQueryBuilder('Department')
      .loadRelationCountAndMap(
        'Department.employeesCount',
        'Department.employees',
      )
      .getMany();
    return {
      departments: departments,
    };
  }
  async getDepartment(departmentId: number) {
    const department = await Department.findOneOrFail(
      { id: departmentId },
      { relations: ['employees'] },
    );
    return new ApiAnswer(true, department);
  }
  async add(body: Department) {
    const department = new Department(body.name, new Date(), body.description);
    await department.save();
    return new ApiAnswer(true, department);
  }
  async delete(departmentId: number) {
    const department = await Department.findOneOrFail(
      { id: departmentId },
      { relations: ['employees'] },
    );
    try {
      await department.remove();
    } catch (err) {
      throw new HttpException(
        `Remove employees first. You can find them at /departments/${departmentId}`,
        HttpStatus.CONFLICT,
      );
    }
    return new ApiAnswer(true, 'Department successfully removed');
  }
  async addEmployee(body: Employee, departmentId: number) {
    const department = await Department.findOneOrFail({ id: departmentId });
    const employee = new Employee(
      body.firstName,
      body.lastName,
      new Date(),
      body.company,
      body.position,
      department,
    );
    await employee.save();
    return new ApiAnswer(true, employee);
  }
  async addEmployeeToDepartment(departmentId: number, employeeId: number) {
    const employee = await Employee.findOneOrFail({ id: employeeId });
    const department = await Department.findOneOrFail({ id: departmentId });
    employee.department = department;
    await employee.save();
    return new ApiAnswer(true, employee);
  }
  async deleteEmployee(employeeId: number, departmentId: number) {
    const employee = await Employee.findOneOrFail(
      { id: employeeId },
      { relations: ['department'] },
    );
    if (employee.department.id != departmentId) {
      throw new HttpException(
        `There is no employee with id = ${employeeId} in department with id : ${departmentId}`,
        404,
      );
    }
    employee.department = null;
    await employee.save();
    return new ApiAnswer(true, 'Employee successfully removed from department');
  }
}
