import { Injectable, Logger } from '@nestjs/common';
import { Employee } from './employee.model';
import { Department } from 'src/departments/department.model';
import { ApiAnswer } from 'src/apianswer.class';
import Ajv from 'ajv';
const ajv = new Ajv();

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);
  async getEmployees(name?: string) {
    console.log(name);
    if (name != undefined) {
      return await Employee.find({ firstName: name });
    } else {
      return await Employee.find();
    }
  }
  async addEmployee(body: any) {
    let department;
    try {
      department = await Department.findOneOrFail({ id: body.departmentId });
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
  async deleteEmployee(employeeId: number) {
    let employee;
    try {
      employee = await Employee.findOneOrFail({ id: employeeId });
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Employee not found');
    }
    await employee.remove();
    return new ApiAnswer(true, 'Employee successfully removed');
  }
  async getEmployee(id: number) {
    let employee;
    try {
      employee = await Employee.findOneOrFail(
        { id: id },
        { relations: ['department'] },
      );
    } catch (err) {
      this.logger.error(err);
      return new ApiAnswer(false, 'Employee not found');
    }
    return new ApiAnswer(true, employee);
  }
}
