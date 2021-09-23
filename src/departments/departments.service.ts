import { Injectable } from '@nestjs/common';
import e from 'express';
import { Employee } from 'src/employees/employee.model';
import { Department } from './department.model';

@Injectable()
export class DepartmentsService {
    async getDepartments() {
        var departments = await Department.find({ relations: ["employees"]})
        for(var key in departments) {
            var dep = departments[key] 
            dep["employeesCount"] = departments[key].employees.length;
            delete dep.employees
        }
        return {
            departments: departments
        }
    }
    async getDepartment(departmentId: number) {
        return {
            department: await Department.findOne({id: departmentId}, { relations: ["employees"]})
        }
    }
    async add(body: any) {
        //TODO: validate body
        var name = body['name']
        var description = body['description']
        var date = new Date();
        const department = new Department(name, date, description)
        await department.save();
    }
    async delete(departmentId : number) {
        //TODO: check department id
        const department = await Department.findOne({id: departmentId})
        await department.remove();
    }
    async addEmployee(body: any, departmentId: number) {
        //TODO: validate body and id
        const department = await Department.findOne({id: departmentId})
        const date = new Date()
        const employee = new Employee(body.firstName, body.lastName, date, body.company, body.position, department)
        await employee.save()
    }
    async addEmployeeToDepartment(departmentId: number, employeeId: number){
        const employee = await Employee.findOne({id: employeeId})
        const department = await Department.findOne({id: departmentId})
        employee.department = department
        await employee.save()
    }
    async deleteEmployee(employeeId: number, departmentId: number) {
        //TODO departmentId
        var employee = await Employee.findOne({id: employeeId})
        employee.department = null
        await employee.save()
    }

}
