import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Redirect } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentService: DepartmentsService) {}
    @Get()
    async getDepartments() {
        return this.departmentService.getDepartments();
    }
    @Get(':departmentId')
    async getDepartment(@Param('departmentId', ParseIntPipe) departmentId: number) {
        return this.departmentService.getDepartment(departmentId);
    }
    @Post()
    async add(@Body() body: any) {
        return this.departmentService.add(body);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) departmentId: number) {
        return this.departmentService.delete(departmentId);
    }
    @Post(':departmentId')
    async addEmployee(@Body() body: any, @Param('departmentId', ParseIntPipe) departmentId: number) {
        return this.departmentService.addEmployee(body, departmentId);
    }
    @Post(':departmentId/:employeeId')
    async addEmployeeToDepartment(
        @Param('departmentId', ParseIntPipe) departmentId: number,
        @Param('employeeId', ParseIntPipe) employeeId: number) {
        return this.departmentService.addEmployeeToDepartment(departmentId, employeeId);
    }
    @Delete(':departmentId/:employeeId')
    async deleteEmployee(@Param('employeeId', ParseIntPipe) employeeId: number, @Param('departmentId', ParseIntPipe) departmentId: number){
        return this.departmentService.deleteEmployee(employeeId, departmentId)
    }
}
