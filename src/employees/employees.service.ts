import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
    getEmployees(name?: string) : object {
        //check parametr and return
        return {
            "filter" : (name != undefined ? name : "no"),
            "employees": []
        }
    }
    addEmployee(body: any) : void {

    }
    deleteEmployee(body: any) : void {

    }
    editEmployee(body: any) : void {

    }
    getEmployee(id? : string) : object {
        return {
            "employee": {
                "id": "id"
            }
        }
    }

}
