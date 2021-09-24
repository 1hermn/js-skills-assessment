import { Injectable, Logger } from '@nestjs/common';
import { Employee } from 'src/employees/employee.model';
import { Department } from './department.model';
import Ajv from 'ajv';
const ajv = new Ajv();
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
    let department;
    try {
      department = await await Department.findOneOrFail(
        { id: departmentId },
        { relations: ['employees'] },
      );
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Department not found');
    }
    return new ApiAnswer(true, department);
  }
  async add(body: any) {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['name', 'description'],
    };
    const validate = ajv.compile(schema);
    const data = body;
    if (!validate(data)) {
      const error = validate.errors.map((e) => e.message);
      this.logger.error(error);
      return new ApiAnswer(false, error);
    }
    const department = new Department(body.name, new Date(), body.description);
    await department.save();
    return new ApiAnswer(true, department);
  }
  async delete(departmentId: number) {
    //TODO: check department id
    let department;
    try {
      department = await Department.findOneOrFail({ id: departmentId });
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Department not found');
    }
    await department.remove();
    return new ApiAnswer(true, 'Department successfully removed');
  }
  async addEmployee(body: any, departmentId: number) {
    let department;
    try {
      department = await Department.findOneOrFail({ id: departmentId });
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Department not found');
    }
    const schema = {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        company: { type: 'string' },
        position: { type: 'string' },
      },
      required: ['firstName', 'lastName', 'company', 'position'],
    };
    const validate = ajv.compile(schema);
    const data = body;
    if (!validate(data)) {
      const error = validate.errors.map((e) => e.message);
      this.logger.error(error);
      return new ApiAnswer(false, error);
    }
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
    let employee, department;
    try {
      employee = await Employee.findOneOrFail({ id: employeeId });
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Employee not found');
    }
    try {
      department = await Department.findOneOrFail({ id: departmentId });
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Department not found');
    }
    employee.department = department;
    await employee.save();
    return new ApiAnswer(true, employee);
  }
  async deleteEmployee(employeeId: number, departmentId: number) {
    let employee;
    try {
      employee = await Employee.findOneOrFail({ id: employeeId });
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Not found  employee');
    }
    if (employee.department != departmentId) {
      return new ApiAnswer(false, 'Department not found');
    }
    employee.department = null;
    await employee.save();
    return new ApiAnswer(true, 'Employee successfully removed from department');
  }
}
