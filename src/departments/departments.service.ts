import { Injectable } from '@nestjs/common';

@Injectable()
export class DepartmentsService {
    getDepartments() : object {
        return {
            departments: []
        }
    }
    getDepartment(departmentId: number): object {
        return {
            department: {
                id: departmentId,
                data: [],
                employees: []
            }
        }
    }
    add(body: any): void {
        //get parametrs from body, check and add
    }
    delete(body: any): void {
        //get id from body and delete department
    }
    edit(body: any): void {
        //check and replce in db
    }
    addEmployee(body: any, departmentId: number): void {

    }
    deleteEmployee(employeeId: number, departmentId: number): void {
        
    }

}
