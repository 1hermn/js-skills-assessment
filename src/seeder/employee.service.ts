import { Employee } from '../employees/employee.model';
import { Injectable } from '@nestjs/common';
import { Department } from 'src/departments/department.model';
import * as faker from 'faker';

@Injectable()
export class EmployeeAndDepartmentSeederService {
  create(
    countOfDepartments: number,
    minCountOfEmployeesInDepartment: number,
    maxCountOfEmployeesInDepartment: number,
  ) {
    const departments: Department[] = [];
    const employees: Employee[] = [];
    for (let i = 0; i < countOfDepartments; i++) {
      const department = new Department(
        faker.company.companyName(),
        new Date(),
        faker.company.catchPhrase(),
      );
      departments.push(department);
      const countOfEmployees = faker.datatype.number({
        min: minCountOfEmployeesInDepartment,
        max: maxCountOfEmployeesInDepartment,
      });
      for (let j = 0; j < countOfEmployees; j++) {
        employees.push(
          new Employee(
            faker.name.firstName(),
            faker.name.lastName(),
            new Date(),
            department.name,
            faker.name.jobTitle(),
            department,
          ),
        );
      }
    }
    Department.save(departments);
    Employee.save(employees);
  }
}
