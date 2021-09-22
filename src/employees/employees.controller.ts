import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}
    @Get()
    getEmployees(): object {
        return this.employeesService.getEmployees();
    }
    @Get('filter')
    getEmployeesWhithFilter(@Query('name') name: string): object {
        return this.employeesService.getEmployees(name);
    }
    @Get(':id')
    getEmployee(@Param('id') id: string): object {
        return this.employeesService.getEmployee(id)
    }
    @Post()
    addEmployee(@Body() body: any): void {
        return this.employeesService.addEmployee(body);
    }
    @Delete()
    deleteEmployee(@Body() body: any): void {
        return this.employeesService.deleteEmployee(body);
    }
    @Post('edit/')
    editEmployee(@Body() body: any) : void {
        return this.employeesService.editEmployee(body);
    }
}
