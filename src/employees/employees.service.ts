import { Injectable } from '@nestjs/common';
import { Employee } from './employee.model';
import { Department } from 'src/departments/department.model';

@Injectable()
export class EmployeesService {
    async getEmployees(name?: string) {
        console.log(name);
        if(name != undefined) {
            return await Employee.find({ firstName: name })
        }else {
            return await Employee.find()
        }
    }
    async addEmployee(body: any) {
        const department = await Department.findOne({id: body.departmentId})
        const employee = new Employee(body.firstName, body.lastName, new Date(), body.company, body.position, department)
        await employee.save()
    }
    async deleteEmployee(employeeId: number) {
        await (await Employee.findOne({ id: employeeId })).remove();
    }
    async getEmployee(id : number) {
        return await Employee.findOne({id: id}, {relations: ["department"]})
    }

}
